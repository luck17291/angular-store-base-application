import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromTask from '../../reducers';
import * as taskAction from '../../actions/task.actions';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  @Input() tasks$: Observable<Task[]>;

  @Input() isLoading$: Observable<boolean>;

  @Output() onGet : EventEmitter<string> = new EventEmitter();

  @Output() onAddTask : EventEmitter<string> = new EventEmitter();

  @Output() onUpdate : EventEmitter<Task> = new EventEmitter();

  @Output() onDelete : EventEmitter<Task> = new EventEmitter();

  getData() {
    this.onGet.emit();
  }

  add() {
    this.onAddTask.emit();
  }

  update(task: Task) {
    this.onUpdate.emit(task);
  }

  delete(task: Task) {
    this.onDelete.emit(task);
  }
}

