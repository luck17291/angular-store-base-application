import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  @Input() tasks$: Observable<Task[]>;

  @Output() onUpdate : EventEmitter<Task> = new EventEmitter();

  @Output() onDelete : EventEmitter<Task> = new EventEmitter();

  update(task: Task) {
    this.onUpdate.emit(task);
  }

  delete(task: Task) {
    this.onDelete.emit(task);
  }
}

