import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import * as task from './reducers/tasks.reducer'
import * as taskAction from './actions/task.actions';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private store: Store<task.State>) { 
        console.log('AuthGuard#canActivate constructed');
    }

    canActivate() {
        this.store.dispatch(new taskAction.LoadAction());
        
        console.log('AuthGuard#canActivate called');
        return true;
    }
}

