import {Action, createReducer, on} from '@ngrx/store';
import * as todolistActions from './actions';
import {Todolist} from '@src/app/model/todolist';


export const todoListFeatureKey = 'taskLists';

export interface TodolistState {
    currentList: Todolist;
    isLoading?: boolean;
    error?: string;
}

export const initialState: TodolistState = {
    currentList: null,
    isLoading: true,
    error: null
};

const todoListReducers = createReducer(
    initialState,
    on(
        todolistActions.todoListLoadedAction,
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
