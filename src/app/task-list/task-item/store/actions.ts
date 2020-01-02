import {Action, createAction, props} from '@ngrx/store';
import {TodoTask} from '@src/app/model/todolist';

export enum ActionTypes {
    // Outbound actions (view created events)
    MARK_TODO_TASK_COMPLETED = '[Task Item] Mark task completed',
    MARK_TODO_TASK_STARTED = '[Task Item] Mark task started',
    UPDATE_TODO_TASK_PROPERTIES = '[Task Item] Update task properties',

    // Intra store actions (cascading model updates)
    ROOT_TODO_TASK_LOADED = '[Task Item] Root tasks loaded',
    LOAD_ROOT_TODO_TASKS = '[Task Item] Load tasks for root task',
}

export const markTaskAsCompletedAction = createAction(
    ActionTypes.MARK_TODO_TASK_COMPLETED,
    props<{taskId: number}>()
);

export const markTaskAsStartedAction = createAction(
    ActionTypes.MARK_TODO_TASK_STARTED,
    props<{taskId: number}>()
);

export const updateTodoTaskPropertiesAction = createAction(
    ActionTypes.UPDATE_TODO_TASK_PROPERTIES,
    props<{id: number, name: string}>()
);

export const loadRootTodoTasks = createAction(
    ActionTypes.LOAD_ROOT_TODO_TASKS,
    props<{ taskId: number }>()
);

export const rootTodoTasksLoaded = createAction(
    ActionTypes.ROOT_TODO_TASK_LOADED,
    props<{ tasks: TodoTask[] }>()
);

