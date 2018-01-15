import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Task } from '../models/task';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TaskService {
    private API_PATH = '/api/tasks';
    public enableNetwork$ = new Subject<boolean>();
    enableNetwork: boolean;

    constructor(private http: Http) {
        this.enableNetwork$.subscribe(val => {
            this.enableNetwork = val;
        });
    }

    getTasks(): Observable<Task[]> {
        // alert("service have been called!");
        return this.http.get(this.API_PATH)
            .map(res => res.json() || []);
    }

    addTask(task: Task): Observable<Task> {
        // alert("service have been called!");
        return this.http.post(this.API_PATH, task)
            .map(res => {
                if (!this.enableNetwork)
                    throw (new EvalError());
                else
                    return res.json();
            });
    }

    updateTask(task: Task): Observable<any> {
        // alert("service have been called!");
        return this.http.put(this.API_PATH, task)
        .map(res => {
            if (!this.enableNetwork)
                throw (new EvalError());
            else
                return res.json();
        });
    }

    deleteTask(task: Task): Observable<Task> {
        // alert("service have been called!");
        return this.http.delete(`${this.API_PATH}/${task.id}`)
        .map(res => {
            if (!this.enableNetwork)
                throw (new EvalError());
            else
                return res.json();
        });
    }
}