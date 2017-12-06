import { fromTasks, State, initialState, adapter } from './tasks.reducer';
import * as TaskAction from '../actions/task.actions';
import { Message, MessageType } from '../models/message';
import { Task } from '../models/task';

describe('Task reducer', () => {
    const task1 = { Id: 1, Name: "task 1", IsCompleted: false } as Task;
    const task2 = { Id: 2, Name: "task 2", IsCompleted: false } as Task;

    it('Tasks reducer initial state', () => {
        let state: State = fromTasks(undefined, { type: null, payload: null });

        expect(state).toEqual(initialState);

        expect(state.ids.length).toEqual(0);
    });

    it('Tasks reducer load tasks', () => {
        let expectation = initialState;
        expectation = {
            ...initialState,
            loading: true,

        }

        let state = fromTasks(initialState, { type: TaskAction.LOAD, payload: null });
        expect(state.ids.length).toEqual(expectation.ids.length);
        expect(expectation).not.toEqual(initialState);
    });

    it('Tasks reducer load tasks success', () => {
        let expectation = initialState;

        expectation = {
            ...adapter.addAll([task1, task2], initialState),
            loading: false,
            message: {
                type: MessageType.Success,
                content: 'Load successed'
            }
        }

        let state = fromTasks(initialState, { type: TaskAction.LOAD_COMPLETED, payload: { tasks: [task1, task2] } });
        expect(state.ids.length).toEqual(expectation.ids.length);
        expect(expectation).not.toEqual(initialState);
    });

    it('Tasks reducer load tasks fail', () => {
        let expectation = initialState;

        expectation = {
            ...initialState,
            loading: false,
            message: {
                type: MessageType.Error,
                content: 'Error loading'
            }
        }

        let state = fromTasks(initialState, { type: TaskAction.LOAD_FAIL, payload: null });
        expect(state.ids.length).toEqual(expectation.ids.length);
        expect(expectation).not.toEqual(initialState);
    });
})