import {Action, createAction, props} from '@ngrx/store';
import {Todolist, TodoTask} from '@src/app/model/todolist';
import { createEffect } from '@ngrx/effects';

export enum ActionTypes {
    // Outbound actions (view created events)
    MOVE_TODO_TASK_TO_NEW_POSITION = '[Task List] Move task to new position',

    // Inbound actions (model updates from store)
    TODO_LIST_LOADED = '[Task List] Todo List Loaded',
    TODO_LIST_UPDATED = '[Task List] Todo List Updated',
    TODO_TASK_ORDERING_CHANGED= '[Task List] Task ordering changed',
}

export enum MoveDirection {
    UP = 'UP',
    DOWN = 'DOWN'
}

export const todoListLoadedAction = createAction(
    ActionTypes.TODO_LIST_LOADED,
    props<{todoList: Todolist }>()
);

export const moveTaskToNewPositionAction = createAction(
    ActionTypes.MOVE_TODO_TASK_TO_NEW_POSITION,
    props<{ movedTaskId: number, targetTaskId: number, direction: MoveDirection }>()
);

export const toDoListUpdatedAction = createAction(
    ActionTypes.TODO_LIST_UPDATED,
    props<{ toDoList: Todolist }>()
);

export const taskOrderingChangeAction = createAction(
    ActionTypes.TODO_TASK_ORDERING_CHANGED,
);
