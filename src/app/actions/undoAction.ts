import { Action } from '@ngrx/store';

export const UNDO_ACTION = 'ngrx-undo/UNDO_ACTION';

export function undo(action: Action) {
    return {
        type: UNDO_ACTION,
        payload: action
    };
}

export class UndoAction implements Action {
    type = UNDO_ACTION;
    constructor(public payload: Action) { }
}

export type Actions = UndoAction;