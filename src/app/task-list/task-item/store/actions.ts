import { Action } from '@ngrx/store';
import {TodoTask} from '@src/app/model/todolist';

export enum ActionTypes {
    // Outbound actions (view created events)
    MARK_TODO_TASK_COMPLETED = '[Task Item] Mark task completed',
    MARK_TODO_TASK_STARTED = '[Task Item] Mark task started',
    UPDATE_TODO_TASK_PROPERTIES = '[Task Item] Update task properties',

    // Intra store actions (cascading model updates)
    TODO_TASK_UPDATED = '[Task Item] Task updated',
}

export class MarkTaskAsCompletedAction implements Action {
    readonly type = ActionTypes.MARK_TODO_TASK_COMPLETED;
    constructor(public payload: {taskId: number}) {}
}

export class MarkTaskAsStartedAction implements Action {
    readonly type = ActionTypes.MARK_TODO_TASK_STARTED;
    constructor(public payload: {taskId: number}) {}
}

export class UpdateTodoTaskPropertiesAction implements Action {
    readonly type = ActionTypes.UPDATE_TODO_TASK_PROPERTIES;
    constructor(public payload: { id: number, name: string }) {}
}

export class TodoTasksUpdated implements Action {
    readonly type = ActionTypes.TODO_TASK_UPDATED;
    constructor(public payload: { task: TodoTask }) {
    }
}

export type TaskItemActions = MarkTaskAsCompletedAction
    | MarkTaskAsStartedAction
    | UpdateTodoTaskPropertiesAction
    | TodoTasksUpdated;
