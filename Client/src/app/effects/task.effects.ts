import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { Task } from '../models/task';
import * as task from '../actions/task.actions';
import { TaskService } from '../services/task.service';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';

@Injectable()
export class TaskEffects {
    constructor(private action$: Actions, private taskService: TaskService) { }

    @Effect()
    loadTasks: Observable<Action> = this.action$
        .ofType(task.LOAD)
        .switchMap(() =>
            this.taskService.getTasks()
                .map((tasks: Task[]) =>
                    new task.LoadCompletedAction({ tasks })
                )
                .catch(error => of(new task.LoadFailAction(error)))
        );

    @Effect()
    addTask: Observable<Action> = this.action$
        .ofType(task.ADD)
        .map((action: task.AddAction) => action.payload)
        .mergeMap(item =>
            this.taskService.addTask(item)
                .map(() =>
                    new task.AddCompletedAction(item)
                )
                .catch(error => of(
                    new task.AddFailAction(error)
                ))
        );

    @Effect()
    updateTask: Observable<Action> = this.action$
        .ofType(task.UPDATE)
        .map((action: task.UpdateAction) => action.payload)
        .mergeMap(item =>
            this.taskService.updateTask(item)
                .map(() => new task.UpdateCompletedAction(item))
                .catch(error => of(new task.UpdateFailAction(error)))
        );

    @Effect()
    deleteTask: Observable<Action> = this.action$
        .ofType(task.DELETE)
        .map((action: task.DeleteAction) => action.payload)
        .mergeMap(item => this.taskService.deleteTask(item)
            .map(() => new task.DeleteCompletedAction(item))
            .catch(error => of(new task.DeleteFailAction(error)))
        );
}