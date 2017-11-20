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
    component;
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

    onAddTask() {
        let task: Task;
        let dialogRef = this.dialog.open(DialogComponent, {
            width: '250px',
            data: Object.assign({}, task)
        });

        dialogRef.afterClosed().subscribe(result => this.addTask(result));
    }

    addTask(task: any) {
        if (task) {
            this.store.dispatch(new taskAction.AddAction(task));
        }
    }

    onUpdateTask(task: Task) {
        let dialogRef = this.dialog.open(DialogComponent, {
            width: '250px',
            data: Object.assign({}, task)
        });

        dialogRef.afterClosed().subscribe(result => this.updateTask(result));
    }

    updateTask(task: any) {
        if (task) {
            this.store.dispatch(new taskAction.UpdateAction(task));
        }
    }

    onDeleteTask(task: Task) {
        if (task) {
            this.store.dispatch(new taskAction.DeleteAction(task));
        }
    }


}
