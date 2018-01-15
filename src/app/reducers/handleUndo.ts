import { Action, ActionReducer } from '@ngrx/store';
import { UNDO_ACTION } from '../actions/undoAction';


let bufferSize = 100;
export function configureBufferSize(size: number): void {
    bufferSize = size;
}
export function handleUndo(rootReducer: ActionReducer<any>): ActionReducer<any> {
    let executedActions: Array<Action> = [];
    let initialState = undefined;
    return (state: any, action: any) => {
        if (action.type === UNDO_ACTION) {
            // if the action is UNDO_ACTION,
            // then call all the actions again on the rootReducer,
            // except the one we want to rollback
            let newState: any = initialState;
            executedActions = executedActions.filter(eAct =>  JSON.stringify(eAct) !== JSON.stringify(action.payload));
            // update the state for every action untill we get the
            // exact same state as before, but without the action we want to rollback
            executedActions.forEach(executedAction =>
                newState = rootReducer(newState, executedAction));

            //[CUSTOME]handle UNDO_ACTION type to raise action fail message in reducer
            newState = rootReducer(newState, action);
            executedActions.push(action);

            return newState;
        }
        // push every action that isn't an UNDO_ACTION to the executedActions property
        executedActions.push(action);
        let updatedState = rootReducer(state, action);
        if (executedActions.length === bufferSize + 1) {
            let firstAction = executedActions[0];
            // calculate the state x (buffersize) actions ago
            initialState = rootReducer(initialState, firstAction);
            // keep the correct actions
            executedActions = executedActions.slice(1, bufferSize + 1);
        }
        return updatedState;
    };
}