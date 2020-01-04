import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Todolist} from '@src/app/model/todolist';
import {TodoListVM} from '@src/app/task-list/view-model';
import {Dictionary} from '@ngrx/entity';
import * as fromTodoList from '@src/app/task-list/store/reducers';
import * as fromRoot from '@src/app/root-store/selectors';
import {selectCurrentListId} from '@src/app/root-store/selectors';


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
    selectCurrentListId,
    (entities, listId) => _buildTodoListVMForId(entities, listId)
);

function _buildTodoListVMForId(entities: Dictionary<Todolist>, id: number): TodoListVM {
    const todoList: Todolist = entities[id];

    return {
        name: todoList.name,
        description: todoList.description,
        rootTaskId: todoList.rootTaskId
    };
}
