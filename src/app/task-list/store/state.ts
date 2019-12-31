import {Todolist} from '@src/app/model/todolist';

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
