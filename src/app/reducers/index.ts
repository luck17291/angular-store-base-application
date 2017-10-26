import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromTask from './tasks.reducer';

export interface TaskState {
    tasks: fromTask.State;
}

export const reducers: ActionReducerMap<TaskState> = {
    tasks: fromTask.reducer
}

export const selectTaskState = createFeatureSelector<fromTask.State>('tasks');


export const {
    selectIds: selectTaskIds,
    selectEntities: selectTaskEntities,
    selectAll: selectAllTasks,
    selectTotal: selectTotalTasls
} = fromTask.adapter.getSelectors(selectTaskState);

export const selectCurrentTaskId = createSelector(selectTaskState, fromTask.getSelectedTaskId);
export const selectCurrentTask = createSelector(selectTaskEntities, selectCurrentTaskId, (taskEntities, taskId) => taskEntities[taskId]);
export const selectIsLoading = createSelector(selectTaskState, fromTask.getLoading);
export const selectMessage = createSelector(selectTaskState, fromTask.getMessage);
export const selectNumberIncompletedTasks = createSelector(selectTaskState, fromTask.getNumberIncompletedTasks);