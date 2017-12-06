import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Task } from '../../models/task';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  actionName = 'Add new';
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task) {
    this.actionName = this.data.Id ? "Update" : "Add new";
    this.data.IsCompleted = this.data.IsCompleted ? this.data.IsCompleted : false;
  }

  save() {
    this.dialogRef.close(this.data);
  }

  close(): void {
    this.dialogRef.close(null);
  }
}
