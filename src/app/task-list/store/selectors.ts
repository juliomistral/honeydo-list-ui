import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromTodoList from './reducers';
import {Todolist} from '@src/app/model/todolist';

const getTaskListState = createFeatureSelector<fromTodoList.TodolistState>(
    fromTodoList.todoListFeatureKey
);

export const selectCurrentTodoList = createSelector(
    getTaskListState,
    state => state.currentList
);

export const selectCurrentTodoListName = createSelector(
    selectCurrentTodoList,
    (currentList: Todolist) => { return currentList.name; }
);


