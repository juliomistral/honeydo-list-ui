import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromTodoList from '@src/app/task-list/store/reducers';
import * as fromRoot from '@src/app/root-store/selectors';


const {
    selectIds,
    selectAll,
    selectEntities,
    selectTotal
} = fromTodoList.adapter.getSelectors();

const getTodoListState = createFeatureSelector<fromTodoList.State>(
    fromTodoList.featureKey
);

const getTodoListEntities = createSelector(
    getTodoListState,
    selectEntities
);

export const selectCurrentTodoList = createSelector(
    getTodoListEntities,
    fromRoot.selectCurrentListId,
    (entities, listId) => entities[listId]
);
