import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastyModule } from 'ng2-toasty';

import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImportMaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers } from '../../reducers';
import { TaskEffects } from '../../effects/task.effects';

import { TaskService } from '../../services/task.service';
import { TodoComponent } from '../../components/todo/todo.component';
import { HeaderComponent } from '../../components/header/header.component';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { ToasterComponent } from '../../components/toaster/toaster.component';
import { TaskCollectionComponent } from '../../containers/task-collection/task-collection.component';

import { Task } from '../../models/task'
import * as taskAction from '../../actions/task.actions';

import { Observable } from 'rxjs/Observable';
import { Actions } from '@ngrx/effects'
import { empty } from 'rxjs/observable/empty';

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

describe('test smart component', () => {
  let component: TaskCollectionComponent;
  let fixture: ComponentFixture<TaskCollectionComponent>;
  let effects: TaskEffects;
  let actions$: TestActions;
  const task1 = { id: 1, name: "task 1", isCompleted: false } as Task;
  const task2 = { id: 2, name: "task 2", isCompleted: false } as Task;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ImportMaterialModule,
        HttpModule,
        FormsModule,
        StoreModule.forRoot(reducers),
        StoreDevtoolsModule.instrument(),
        EffectsModule.forRoot([TaskEffects]),
        ToastyModule.forRoot()
      ],
      declarations: [ 
        TodoComponent,
        HeaderComponent,
        DialogComponent,
        ToasterComponent,
        TaskCollectionComponent
       ],
       providers: [TaskService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it shoulf dispatch taskAction.AddAction when add task',() => {
    const action = new taskAction.AddAction(task1);
    const completion = new taskAction.AddCompletedAction(task1);

    

    expect(component.add()).toHaveBeenCalledWith()
  })

  it('it shoulf dispatch taskAction.UpdateAction when update task',() => {})

  it('it shoulf dispatch taskAction.DeleteAction when delete task',() => {

  })

});
