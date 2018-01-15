import { ActionReducerMap, Action } from '@ngrx/store';
import * as task from '../reducers/tasks.reducer';
import * as undoAction from '../reducers/failAction.reducer';

export interface State {
    task: task.TaskState
    undoAction: undoAction.FailActionState;
}

export const reducers: ActionReducerMap<State> = {
    task: task.reducer,
    undoAction: undoAction.reducer
}