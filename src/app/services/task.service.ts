import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Task } from '../models/task';

@Injectable()
export class TaskService {
    private API_PATH = '/api/tasks';
    constructor(private http: Http) { }

    getTasks(): Observable<Task[]> {
        alert("service have been called!");
        return this.http.get(this.API_PATH)
            .map(res => res.json() || []);
    }

    addTask(task: Task): Observable<Task> {
        alert("service have been called!");
        return this.http.post(this.API_PATH, task)
            .map(res => res.json());
    }

    updateTask(task: Task): Observable<any> {
        alert("service have been called!");
        return this.http.put(this.API_PATH, task)
                .map(() => { throw (new EvalError()) });
                // .map(res => res.json());
    }

    deleteTask(task: Task): Observable<Task> {
        alert("service have been called!");
        return this.http.delete(`${this.API_PATH}/${task.id}`)
            .map(res => res.json());
    }
}