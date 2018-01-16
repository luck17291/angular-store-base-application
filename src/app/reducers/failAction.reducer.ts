
import { Action } from '@ngrx/store';
import { undo, UndoAction, UNDO_ACTION } from '../actions/undoAction'
import * as allAction from '../actions/index.action'
import * as TASK from '../actions/task.actions'

export interface FailActionState {
    failActions: Array<Action>;
};

const initialState: FailActionState = {
    failActions: []
};

export function reducer(state = initialState, action: UndoAction): FailActionState {
    if (action.type === UNDO_ACTION) {
        return{
            ...state,
            failActions : AddActionToListAction(state.failActions, action.payload)
        }
    }
    else {
        return{
            ...state,
            failActions : RemoveActionToListAction(state.failActions, action)
        }
    }
}

function RemoveActionToListAction(listAction: Array<TASK.Actions>, action: TASK.Actions) {
    let _listAction = DeepCopy(listAction);

    for (let i = 0; i < _listAction.length; i++) {
        if (_listAction[i].type === action.type && JSON.stringify(_listAction[i].payload) === JSON.stringify(action.payload)) {
            _listAction.splice(i, 1);
        }
    }

    return _listAction
}

function AddActionToListAction(listAction: Array<TASK.Actions>, action: TASK.Actions) {
    let _listAction = DeepCopy(listAction);
    let isExist = false;

    for (let act of listAction) {
        if (act.type === action.type && JSON.stringify(act.payload) === JSON.stringify(action.payload)) {
            isExist = true;
            break;
        }
    }

    if (!isExist) {
        _listAction.push(action);
    }
    return _listAction
}

function DeepCopy(object) {
    return JSON.parse(JSON.stringify(object));
}

export const getFailActions = (state: FailActionState) => state.failActions;