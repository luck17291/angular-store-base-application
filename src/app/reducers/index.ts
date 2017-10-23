import { ActionReducerMap } from '@ngrx/store';
import * as task from '../reducers/tasks.reducer';

export interface State {
    task: task.State;
}

export const reducers: ActionReducerMap<State> = {
    task: task.reducer
}