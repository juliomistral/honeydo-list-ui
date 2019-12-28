import {Todolist} from '@src/app/model/todolist';

export interface TodoListState {
    currentList: Todolist;
    isLoading?: boolean;
    error?: string;
}

export const initialState: TodoListState = {
    currentList: null,
    isLoading: false,
    error: null
};
