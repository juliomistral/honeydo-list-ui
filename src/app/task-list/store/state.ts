import {Todolist} from '@src/app/model/todolist';

export interface State {
    currentList: Todolist;
    isLoading?: boolean;
    error?: string;
}

export const initialState: State = {
    currentList: null,
    isLoading: false,
    error: null
};
