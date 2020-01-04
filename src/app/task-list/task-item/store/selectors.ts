import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromTodoTask from '@src/app/task-list/task-item/store/reducers';
import {Dictionary} from '@ngrx/entity';
import {TodoTask} from '@src/app/model/todolist';
import {TodoTaskNodeVM} from '@src/app/task-list/task-item/view-model';
import {selectCurrentTodoList} from '@src/app/task-list/store/selectors';


const {
    selectIds,
    selectAll,
    selectEntities,
    selectTotal
} = fromTodoTask.adapter.getSelectors();

const getTodoTaskState = createFeatureSelector<fromTodoTask.State>(
    fromTodoTask.featureKey
);

const getTodoTaskEntities = createSelector(
    getTodoTaskState,
    selectEntities
);

function _buildTreeVMForTaskId(entities: Dictionary<TodoTask>, taskId: number): TodoTaskNodeVM {
    const rootTask: TodoTask = entities[taskId];
    const rootNode: TodoTaskNodeVM = {
        id: rootTask.id,
        subNodes: []
    };
    if (rootTask.hasChildren()) {

        rootTask.subTaskIds.forEach(subTaskId => {
            rootNode.subNodes.push(_buildTreeVMForTaskId(entities, subTaskId));
        });
    }
    return rootNode;
}

export const selectTodoTaskNodesForCurrentList = createSelector(
    getTodoTaskEntities,
    selectCurrentTodoList,
    (entities, todoList) => _buildTreeVMForTaskId(entities, todoList.rootTaskId)
);

export const selectTodoTaskById = createSelector(
    getTodoTaskEntities,
    (entities, props: { id: number }) => entities[props.id]
);

