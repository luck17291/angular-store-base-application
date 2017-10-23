import { Task } from '../models/task';
import { Action } from '@ngrx/store';

export const LOAD = '[Task] Load';
export const LOAD_COMPLETED = '[Task] Load Completed';
export const LOAD_FAIL = '[Task] Load Fail';
export const ADD = '[Task] Add';
export const ADD_COMPLETED = '[Task] Add Completed';
export const ADD_FAIL = '[Task] Add Fail';
export const UPDATE = '[Task] Update';
export const UPDATE_COMPLETED = '[Task] Update Completed';
export const UPDATE_FAIL = '[Task] Update Fail';
export const DELETE = '[Task] Delete';
export const DELETE_COMPLETED = '[Task] Delete Completed';
export const DELETE_FAIL = '[Task] Delete Fail';

export class LoadAction implements Action {
    type = LOAD;
    constructor(public payload?: any) { }
}

export class LoadCompletedAction implements Action {
    type = LOAD_COMPLETED;
    constructor(public payload: Task[]) { }
}

export class LoadFailAction implements Action {
    type = LOAD_FAIL;
    constructor(public payload: Task[]) { }
}

export class AddAction implements Action {
    type = ADD;
    constructor(public payload: Task) { }
}

export class AddCompletedAction implements Action {
    type = ADD_COMPLETED;
    constructor(public payload: Task) { }
}

export class AddFailAction implements Action {
    type = ADD_FAIL;
    constructor(public payload: Task) { }
}

export class UpdateAction implements Action {
    type = UPDATE;
    constructor(public payload: Task) { }
}

export class UpdateCompletedAction implements Action {
    type = UPDATE_COMPLETED;
    constructor(public payload: Task) { }
}

export class UpdateFailAction implements Action {
    type = UPDATE_FAIL;
    constructor(public payload: Task) { }
}

export class DeleteAction implements Action {
    type = DELETE;
    constructor(public payload: Task) { }
}

export class DeleteCompletedAction implements Action {
    type = DELETE_COMPLETED;
    constructor(public payload: Task) { }
}

export class DeleteFailAction implements Action {
    type = DELETE_FAIL;
    constructor(public payload: Task) { }
}

export type Actions =
    LoadAction | LoadCompletedAction |
    AddAction | AddCompletedAction | AddFailAction |
    UpdateAction | UpdateCompletedAction | UpdateFailAction |
    DeleteAction | DeleteCompletedAction | DeleteFailAction;