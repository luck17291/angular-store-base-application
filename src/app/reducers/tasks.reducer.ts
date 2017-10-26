import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Task } from '../models/task';
import * as TaskAction from '../actions/task.actions';
import { Message, MessageType } from '../models/message';

export interface State extends EntityState<Task> {
    selectedTaskId: string | null;
    loading: boolean;
    numberIncompletedTasks: number;
    message: Message;
};

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>({
    selectId: (task: Task) => task.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    selectedTaskId: null,
    loading: false,
    numberIncompletedTasks: 0,
    message: null
});

export function reducer(state = initialState, action: TaskAction.All): State {
    switch (action.type) {
        case TaskAction.LOAD: {
            return {
                ...state,
                loading: true,
            }
        }
        case TaskAction.LOAD_COMPLETED: {
            return {
                ...adapter.addAll(action.payload.tasks, state),
                loading: false,
                message: {
                    type: MessageType.Success,
                    content: 'Load successed'
                }
            }
        }
        case TaskAction.DELETE:
        case TaskAction.UPDATE:
        case TaskAction.ADD: {
            return {
                ...state,
                loading: true
            }
        }

        case TaskAction.ADD_COMPLETED: {
            return {
                ...adapter.addOne(action.payload, state),
                loading: false,
                message: {
                    type: MessageType.Success,
                    content: 'Add successed'
                },
            }
        }

        case TaskAction.DELETE_COMPLETED: {
            return {
                ...adapter.removeOne(action.payload.id, state),
                loading: false,
                message: {
                    type: MessageType.Success,
                    content: 'Delete successed'
                }
            }
        }
        case TaskAction.UPDATE_COMPLETED: {
            return {
                ...adapter.updateOne({ id: action.payload.id, changes: action.payload }, state),
                loading: false,
                message: {
                    type: MessageType.Success,
                    content: 'Update successed'
                }
            }
        }

        case TaskAction.ADD_FAIL: {
            return {
                ...state,
                loading: false,
                message: {
                    type: MessageType.Error,
                    content: 'Error adding'
                }
            }
        }
        case TaskAction.DELETE_FAIL: {
            return {
                ...state,
                loading: false,
                message: {
                    type: MessageType.Error,
                    content: 'Error deleting'
                }
            }
        }
        case TaskAction.UPDATE_FAIL: {
            return {
                ...state,
                loading: false,
                message: {
                    type: MessageType.Error,
                    content: 'Error updating'
                }
            }
        }
        case TaskAction.LOAD_FAIL: {
            return {
                ...state,
                loading: false,
                message: {
                    type: MessageType.Error,
                    content: 'Error loading'
                }
            }
        }

        default: {
            return state;
        }
    }
}


export const getLoading = (state: State) => state.loading;
export const getTasks = (state: State) => state.entities;
export const getMessage = (state: State) => state.message;
export const getNumberIncompletedTasks = (state: State) => state.numberIncompletedTasks;
export const getSelectedTaskId = (state: State) => state.selectedTaskId;