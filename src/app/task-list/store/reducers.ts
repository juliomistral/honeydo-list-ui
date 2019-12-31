import {Action, createReducer, on} from '@ngrx/store';
import * as TodolistActions from './actions';
import {initialState as TodoListInitialState, TodolistState} from 'src/app/task-list/store/state';

export const todoListReducerKey = 'taskList';

const todoListReducers = createReducer(
    TodoListInitialState,
    on(
        TodolistActions.todoListLoadedAction,
        (state, action) => ({
            ...state,
            currentList: action.todoList,
            isLoading: false
        })
    ),
);

export function reducer(state: TodolistState | undefined, action: Action) {
    return todoListReducers(state, action);
}
