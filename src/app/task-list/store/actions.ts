import { Action } from '@ngrx/store';
import {Todolist, TodoTask} from '@src/app/model/todolist';
import { createEffect } from '@ngrx/effects';

export enum ActionTypes {
    // Outbound actions (view created events)
    MOVE_TODO_TASK_TO_NEW_POSITION = '[Task List] Move task to new position',

    // Inbound actions (model updates from store)
    TODO_LIST_LOADED = '[Task List] Todo List Loaded',
    TODO_LIST_UPDATED = '[Task List] Todo List Updated',
    TODO_TASK_ORDERING_CHANGED= '[Task List] Task ordering changed',

    // Intra store actions (cascading model updates)
    LOAD_TODO_LIST = '[Task List] Load list',
    LOAD_TODO_LIST_TASKS = '[Task List] Load list tasks'
}

export class MoveTaskToNewPositionAction implements Action {
    readonly type = ActionTypes.MOVE_TODO_TASK_TO_NEW_POSITION;
    constructor(public payload: { movedTaskId: number, targetTaskId: number }) {}
}

export class TodoListLoadedAction implements Action {
    readonly type = ActionTypes.TODO_LIST_LOADED;
    constructor(payload: {todoList: Todolist }) {}
}

export class ToDoListUpdatedAction implements Action {
    readonly type = ActionTypes.TODO_LIST_UPDATED;
    constructor(public payload: { toDoList: Todolist }) {}
}

export class TaskOrderingChangeAction implements Action {
    readonly type = ActionTypes.TODO_TASK_ORDERING_CHANGED;
}

export class LoadListAction implements Action {
    readonly type = ActionTypes.LOAD_TODO_LIST;
    constructor(payload: { listId: number }) {
    }
}

export class LoadListTasksAction implements Action {
    readonly type = ActionTypes.LOAD_TODO_LIST_TASKS;
    constructor(payload: { rootTaskId: number }) {
    }
}

export type TaskListActions = MoveTaskToNewPositionAction
    | TodoListLoadedAction
    | ToDoListUpdatedAction
    | TaskOrderingChangeAction
    | LoadListAction
    | LoadListTasksAction;
