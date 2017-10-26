import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Task } from '../../models/task';
import * as fromTask from '../../reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  tasks$: Observable<Task[]>;
  numberIncompletedTasks: number;
  constructor(private store: Store<fromTask.TaskState>, ) {
    this.tasks$ = store.select(fromTask.selectAllTasks);
    this.numberIncompletedTasks = 0;
  }

  ngOnInit() {
    this.tasks$.subscribe(tasks => {
      this.numberIncompletedTasks = countIncompletedTasks(tasks);
    })

    function countIncompletedTasks(tasks: Task[]): number {
      let total = 0;
      tasks.map((item: Task) => {
        if (item.isCompleted === false)
          ++total;
      })
      return total;
    }
  }
}
