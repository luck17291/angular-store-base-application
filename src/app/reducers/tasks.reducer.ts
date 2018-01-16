import { Action } from '@ngrx/store';
import { Task } from '../models/task';
import * as TASK from '../actions/task.actions';
import * as UNDO_ACTIONS from '../actions/undoAction';
import { Message, MessageType } from '../models/message';
import * as _ from "lodash";
import { templateJitUrl, flatten } from '@angular/compiler';
import { getFailActions } from './failAction.reducer';
export interface TaskState {
    entities: Task[];
    loading: boolean;
    numberIncompletedTasks: number;
    message: Message;
};

const initialState: TaskState = {
    entities: [],
    loading: false,
    numberIncompletedTasks: 0,
    message: null,
};

export function reducer(state = initialState, action: TASK.Actions): TaskState {

    switch (action.type) {
        case TASK.LOAD: {
            return DeepCopy({
                ...state,
                loading: true,
                numberIncompletedTasks: countIncompletedTasks(state.entities),
                message: null,
            });
        }
        case TASK.LOAD_COMPLETED: {
            const tasks = action.payload;
            return DeepCopy({
                ...state,
                entities: tasks,
                loading: false,
                numberIncompletedTasks: countIncompletedTasks(tasks),
                message: null,
            })
        }

        case TASK.ADD: {
            const task = action.payload;
            return DeepCopy({
                ...state,
                entities: [...state.entities, task],
                numberIncompletedTasks: state.numberIncompletedTasks + 1,
                message: null,
            })
        }

        case TASK.DELETE: {
            const task = action.payload;
            return DeepCopy({
                ...state,
                entities: state.entities.filter(item => item.id !== task.id),
                numberIncompletedTasks: state.numberIncompletedTasks - 1,
                message: null,
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
                    message: null,
                })
            }
        case UNDO_ACTIONS.RAISE_ERROR_MESSAGE:
            {
                const actionType = action.payload.type;

                switch (actionType) {
                    case TASK.LOAD:
                        {
                            return DeepCopy({
                                ...state,
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
