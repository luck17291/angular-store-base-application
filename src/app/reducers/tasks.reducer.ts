
import { Action } from '@ngrx/store';
import { Task } from '../models/task';
import * as TASK from '../actions/task.actions';
import { Message, MessageType } from '../models/message';
import * as _ from "lodash";
import { templateJitUrl, flatten } from '@angular/compiler';

export interface State {
    entities: Task[];
    loading: boolean;
    numberIncompletedTasks: number;
    message: Message;
    failActions: Array<Action>;
};

const initialState: State = {
    entities: [],
    loading: false,
    numberIncompletedTasks: 0,
    message: null,
    failActions: []
};

export function reducer(state = initialState, action: TASK.Actions): State {
    RemoveActionToListAction(state.failActions, action);
    switch (action.type) {
        case TASK.LOAD: {
            return DeepCopy({
                ...state,
                loading: true,
                numberIncompletedTasks: countIncompletedTasks(state.entities)
            });
        }
        case TASK.LOAD_COMPLETED: {
            const tasks = action.payload;
            return DeepCopy({
                ...state,
                entities: tasks,
                loading: false,
                numberIncompletedTasks: countIncompletedTasks(tasks)
            })
        }

        case TASK.ADD: {
            const task = action.payload;
            return DeepCopy({
                ...state,
                entities: [...state.entities, task],
                numberIncompletedTasks: state.numberIncompletedTasks + 1,
            })
        }

        case TASK.DELETE: {
            const task = action.payload;
            return DeepCopy({
                ...state,
                entities: state.entities.filter(item => item.id !== task.id),
                numberIncompletedTasks: state.numberIncompletedTasks - 1,
            })
        }
        case TASK.UPDATE:
            {
                const task = action.payload;
                return DeepCopy({
                    ...state,
                    entities: state.entities.map(item => {
                        if (item.id === task.id) {
                            return Object.assign({}, task);
                        }
                        return item;
                    }),
                    numberIncompletedTasks: countIncompletedTasks(state.entities),

                })
            }
        case "ngrx-undo/UNDO_ACTION":
            {
                const actionType = action.payload.type;
                let newFailActions = AddActionToListAction(state.failActions, action.payload);
                switch (actionType) {
                    case TASK.LOAD:
                        {
                            return DeepCopy({
                                ...state,
                                failActions: newFailActions,
                                loading: false,
                                message: {
                                    type: MessageType.Error,
                                    content: 'Error loading'
                                }
                            })
                        }
                    case TASK.DELETE:
                        {
                            return DeepCopy({
                                ...state,
                                failActions: newFailActions,
                                message: {
                                    type: MessageType.Error,
                                    content: 'Error deleting'
                                }
                            })
                        }
                    case TASK.UPDATE:
                        {
                            return DeepCopy({
                                ...state,
                                failActions: newFailActions,
                                message: {
                                    type: MessageType.Error,
                                    content: 'Error updating'
                                }
                            })
                        }

                    case TASK.ADD:
                        {
                            return DeepCopy({
                                ...state,
                                failActions: newFailActions,
                                message: {
                                    type: MessageType.Error,
                                    content: 'Error adding'
                                }
                            })
                        }
                }
            }

        default: {
            return state;
        }
    }

    function countIncompletedTasks(tasks: Task[]): number {
        let total = 0;
        tasks.map((item: Task) => {
            if (item.isCompleted === false)
                ++total;
        })
        return total;
    }
}

function DeepCopy(object) {
    return JSON.parse(JSON.stringify(object));
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

function RemoveActionToListAction(listAction: Array<TASK.Actions>, action: TASK.Actions) {
    let _listAction = DeepCopy(listAction);

    for (let i = 0; i < _listAction.length; i++) {
        if (_listAction[i].type === action.type && JSON.stringify(_listAction[i].payload) === JSON.stringify(action.payload)) {
            _listAction.splice(i, 1);
        }
    }

    return _listAction
}

export const getLoading = (state: State) => state.loading;
export const getTasks = (state: State) => state.entities;
export const getFailActions = (state: State) => state.failActions;