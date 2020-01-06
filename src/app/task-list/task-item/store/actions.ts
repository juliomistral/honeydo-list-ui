import {Action, createAction, props} from '@ngrx/store';
import {TodoTask} from '@src/app/model/todolist';
import {Update} from '@ngrx/entity';

export enum ActionTypes {
    // Outbound actions (view created events)
    MARK_TODO_TASK_COMPLETED = '[Task Item] Mark task completed',
    MARK_TODO_TASK_STARTED = '[Task Item] Mark task started',
    UPDATE_TODO_TASK_PROPERTIES = '[Task Item] Update task properties',

    // Intra store actions (cascading model updates)
    LOAD_ROOT_TODO_TASKS = '[Task Item] Load tasks for root task',
    ROOT_TODO_TASK_LOADED = '[Task Item] Root tasks loaded',
    TODO_TASK_PROPERTIES_UPDATED = '[Task Item] Todo task updated'
}

export const markTaskAsCompletedAction = createAction(
    ActionTypes.MARK_TODO_TASK_COMPLETED,
    props<{ taskId: number }>()
);

export const markTaskAsStartedAction = createAction(
    ActionTypes.MARK_TODO_TASK_STARTED,
    props<{ taskId: number }>()
);

export const updateTodoTaskProperties = createAction(
    ActionTypes.UPDATE_TODO_TASK_PROPERTIES,
    props<{ updatedTask: Update<TodoTask> }>()
);

export const loadRootTodoTasks = createAction(
    ActionTypes.LOAD_ROOT_TODO_TASKS,
    props<{ taskId: number }>()
);

export const rootTodoTasksLoaded = createAction(
    ActionTypes.ROOT_TODO_TASK_LOADED,
    props<{ tasks: TodoTask[] }>()
);

export const todoTaskPropertiesUpdated = createAction(
    ActionTypes.TODO_TASK_PROPERTIES_UPDATED,
    props<{ updatedTask: Update<TodoTask> }>()
);
