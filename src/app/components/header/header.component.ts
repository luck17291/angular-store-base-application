import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Task } from '../../models/task';
import * as task from '../../reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 numberIncompletedTasks: number;
 numberIncompletedTasks$: Observable<number>;
  constructor(private store: Store<task.State>,) {
    this.numberIncompletedTasks = 0;
    this.numberIncompletedTasks$ = store.select('task').select('numberIncompletedTasks');
   }

  ngOnInit() {
    this.numberIncompletedTasks$.subscribe(numberT => {
      this.numberIncompletedTasks = numberT;
    })
  }

}
