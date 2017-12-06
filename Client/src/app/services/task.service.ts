import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Task } from '../models/task';

@Injectable()
export class TaskService {
    // private API_PATH = '/api/tasks';
    private API_PATH = 'http://172.29.253.152/api/Tasks';

    header: Headers = new Headers({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'content-type'
    });

    option: RequestOptions = new RequestOptions({ headers: this.header });

    constructor(private http: Http) { }

    getTasks(): Observable<Task[]> {
        return this.http.get(this.API_PATH, this.option)
            .map(res => res.json() || []);
    }

    addTask(task: Task): Observable<boolean> {
        return this.http.post(this.API_PATH, task, this.option)
            .map(res => res.ok);
    }

    updateTask(task: Task): Observable<boolean> {
        return this.http.put(`${this.API_PATH}/${task.Id}`, task, this.option)
            .map(res => res.ok);
    }

    deleteTask(task: Task): Observable<boolean> {
        return this.http.delete(`${this.API_PATH}/${task.Id}`, this.option)
            .map(res => res.ok);
    }
}