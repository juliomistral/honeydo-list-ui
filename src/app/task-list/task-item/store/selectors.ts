import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Dictionary} from '@ngrx/entity';
import {Todolist, TodoTask} from '@src/app/model/todolist';
import {selectCurrentTodoList} from '@src/app/task-list/store/selectors';
import * as fromTodoTask from 'src/app/task-list/task-item/store/reducers';
import {TodoTaskNodeVM} from '../view-model';


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
        children: []
    };

    if (rootTask.subTaskIds) {
        rootTask.subTaskIds.forEach(subTaskId => {
            rootNode.children.push(_buildTreeVMForTaskId(entities, subTaskId));
        });
    }
    return rootNode;
}

export const selectTodoTaskNodesForCurrentList = createSelector(
    getTodoTaskEntities,
    selectCurrentTodoList,
    (entities: Dictionary<TodoTask>, todoList: Todolist) => {
        console.log('In selector:  creating task node tree...');
        return _buildTreeVMForTaskId(entities, todoList.rootTaskId);
    }
);

export const selectTodoTaskById = createSelector(
    getTodoTaskEntities,
    (entities, props: { id: number }) => entities[props.id]
);

