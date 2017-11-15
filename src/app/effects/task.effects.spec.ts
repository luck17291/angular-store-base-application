import { Actions } from '@ngrx/effects'
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { empty } from 'rxjs/observable/empty';
import { cold, hot } from 'jasmine-marbles';

import { Http, HttpModule } from '@angular/http';
import { TaskService } from '../services/task.service'
import { TaskEffects } from './task.effects';

import { Task } from '../models/task';
import * as TaskAction from '../actions/task.actions';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';


export class TestActions extends Actions {
    constructor() {
        super(empty());
    }

    set stream(source: Observable<any>) {
        this.source = source;
    }
}

export function getActions() {
    return new TestActions();
}

describe('test task effects', () => {
    let effects: TaskEffects;
    let actions$: TestActions;
    const task1 = { id: 1, name: "task 1", isCompleted: false } as Task;
    const task2 = { id: 2, name: "task 2", isCompleted: false } as Task;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                TaskService,
                TaskEffects,
                { provide: Actions, useFactory: getActions },
            ],
        });
        effects = TestBed.get(TaskEffects);
        actions$ = TestBed.get(Actions);
    });

    describe('load tasks', () => {

        it('should return a TaskAction.LoadCompletedAction, with the books, on success', () => {
            const action = new TaskAction.LoadAction();
            const completion = new TaskAction.LoadCompletedAction({ tasks: [task1, task2] });

            spyOn(TaskService.prototype, "getTasks").and.returnValue(Observable.of([task1, task2]));

            actions$.stream = hot('a', { a: action })
            const expected = cold('c', { c: completion });

            expect(effects.loadTasks).toBeObservable(expected);
        });

        it('should return a TaskAction.LoadFailAction, if the query throws', () => {
            const action = new TaskAction.LoadAction();
            const error = 'Error!';

            const completion = new TaskAction.LoadFailAction(null);

            spyOn(TaskService.prototype, "getTasks").and.throwError(error);

            actions$.stream = hot('-a', { a: action });
            const response = cold('-#', {}, error);
            const expected = cold('-c', { c: completion });

            expect(effects.loadTasks).toBeObservable(expected);
        })

    })

    describe('add task', () => {
        it('should return a TaskAction.AddCompletedAction on success', () => {
            const action = new TaskAction.AddAction(task1);
            const completion = new TaskAction.AddCompletedAction(task1);

            spyOn(TaskService.prototype, "addTask").and.returnValue(Observable.of(task1));

            actions$.stream = hot('-a', { a: action });
            const response = cold('-b', { b: task1 });
            const expected = cold('-c', { c: completion });

            expect(effects.addTask).toBeObservable(expected);
         });

        it('should return a TaskAction.AddFailAction on fail', () => {
            const action = new TaskAction.AddAction(task1);
            const completion = new TaskAction.AddFailAction(task1);
            const error = "Error";
            spyOn(TaskService.prototype, "addTask").and.throwError(error);

            actions$.stream = hot('-a', { a: action });
            const response = cold('-#', { }, error);
            const expected = cold('-c', { c: completion });

            expect(effects.addTask).toBeObservable(expected);
         });
    });

    describe('update task', () => {
        it('should return a TaskAction.UpdateCompletedAction on success', () => { 
            const action = new TaskAction.UpdateAction(task1);
            const completion = new TaskAction.UpdateCompletedAction(task1);

            spyOn(TaskService.prototype, "updateTask").and.returnValue(Observable.of(task1));
            
            actions$.stream = hot('-a', { a: action });
            const response = cold('-b', { b: task1 });
            const expected = cold('-c', { c: completion });
    
            expect(effects.updateTask).toBeObservable(expected);
        });

        it('should return a TaskAction.UpdateFailAction on fail', () => { 
            const action = new TaskAction.UpdateAction(task1);
            const completion = new TaskAction.UpdateFailAction(task1);
            const error = "Error";

            spyOn(TaskService.prototype, "updateTask").and.throwError(error);
            
            actions$.stream = hot('-a', { a: action });
            const response = cold('-#', { b: task1 });
            const expected = cold('-c', { c: completion });
    
            expect(effects.updateTask).toBeObservable(expected);
        });
    });

    describe('delete task', () => {
        it('should return a TaskAction.DeleteCompletedAction on success', () => {
            const action = new TaskAction.DeleteAction(task1);
            const completion = new TaskAction.DeleteCompletedAction(task1);

            spyOn(TaskService.prototype, "deleteTask").and.returnValue(Observable.of(task1));
            
            actions$.stream = hot('-a', { a: action });
            const response = cold('-b', { b: task1 });
            const expected = cold('-c', { c: completion });
    
            expect(effects.deleteTask).toBeObservable(expected);
         });

        it('should return a TaskAction.DeleteFailAction on fail', () => {
            const action = new TaskAction.DeleteAction(task1);
            const completion = new TaskAction.DeleteFailAction(task1);
            const error = "Error";

            spyOn(TaskService.prototype, "deleteTask").and.throwError(error);
            
            actions$.stream = hot('-a', { a: action });
            const response = cold('-#', { b: task1 });
            const expected = cold('-c', { c: completion });
    
            expect(effects.deleteTask).toBeObservable(expected);
         });
    });
});



