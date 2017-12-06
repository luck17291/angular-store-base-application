import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Actions } from '@ngrx/effects'
import { empty } from 'rxjs/observable/empty';

import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { ImportMaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';
import { ToastyModule } from 'ng2-toasty';

import { TaskService } from '../../services/task.service';
import { TodoComponent } from '../../components/todo/todo.component';
import { HeaderComponent } from '../../components/header/header.component';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { ToasterComponent } from '../../components/toaster/toaster.component';
import { TaskCollectionComponent } from '../../containers/task-collection/task-collection.component';

import { Task } from '../../models/task'
import * as taskAction from '../../actions/task.actions';

import * as fromTasks from '../../reducers/tasks.reducer';
import { fromRoot } from '../../reducers';

describe('test smart component', () => {
  let component: TaskCollectionComponent;
  let fixture: ComponentFixture<TaskCollectionComponent>;
  let store: Store<fromTasks.State>;

  const task1 = { Id: 1, Name: "task 1", IsCompleted: false } as Task;
  const task2 = { Id: 2, Name: "task 2", IsCompleted: false } as Task;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ImportMaterialModule,
        FormsModule,
        StoreModule.forRoot(fromRoot),
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

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch taskAction.LoadAction when get task', () => {
    const action = new taskAction.LoadAction();
    component.getData();
    expect(store.dispatch).toHaveBeenCalledWith(action)
  })

  it('should dispatch taskAction.AddAction when add task', () => {
    const action = new taskAction.AddAction(task1);
    component.addTask(task1);
    expect(store.dispatch).toHaveBeenCalledWith(action)
  });

  it('should dispatch taskAction.Update when update task', () => {
    const action = new taskAction.UpdateAction(task1);
    component.updateTask(task1);
    expect(store.dispatch).toHaveBeenCalledWith(action)
  });

  it('should dispatch taskAction.DeleteAction when delete task', () => {
    const action = new taskAction.DeleteAction(task1);
    component.onDeleteTask(task1);
    expect(store.dispatch).toHaveBeenCalledWith(action)
  })

});
