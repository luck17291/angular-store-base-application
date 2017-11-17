import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromTask from '../../reducers';
import * as taskAction from '../../actions/task.actions';

import { DialogComponent } from '../../components/dialog/dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'task-collection',
  templateUrl: './task-collection.component.html',
  styleUrls: ['./task-collection.component.scss']
})
export class TaskCollectionComponent implements OnInit {

  tasks$: Observable<Task[]>;
  isLoading$: Observable<boolean>;

  constructor(private store: Store<fromTask.TaskState>, public dialog: MatDialog) {
      this.tasks$ = store.select(fromTask.selectAllTasks);
      this.isLoading$ = store.select(fromTask.selectIsLoading);

  }

  ngOnInit() {
      this.getData();
  }

  getData() {
      this.store.dispatch(new taskAction.LoadAction());
  }

  add() {
      let task: Task;
      let dialogRef = this.dialog.open(DialogComponent, {
          width: '250px',
          data: Object.assign({}, task)
      });

      dialogRef.afterClosed().subscribe(result => {
          if (result) {
              this.store.dispatch(new taskAction.AddAction(result));
          }
      });
  }

  update(task: Task) {
      let dialogRef = this.dialog.open(DialogComponent, {
          width: '250px',
          data: Object.assign({}, task)
      });

      dialogRef.afterClosed().subscribe(result => {
          if (result) {
              this.store.dispatch(new taskAction.UpdateAction(result));
          }
      });
  }

  delete(task: Task) {
      this.store.dispatch(new taskAction.DeleteAction(task));
  }


}
