import {Todolist, TodoTask} from '@src/app/model/todolist';
import { TodoListState, initialState as todoListInitState } from 'src/app/task-list/store/state';
import { TaskItemState, initialState as todoItemInitState } from 'src/app/task-list/task-item/store/state';

export interface ApplicationState {
    uiState: UiState;
    storeState: StoreState;
}

export interface UiState {
    userId: number;
    currentListId: number;
    currentError?: string;
    currentMessage?: string;
}

export interface StoreState {
    taskList: TodoListState;
    taskItem: TaskItemState;
}

export const INITIAL_UI_STATE: UiState = {
    userId: undefined,
    currentListId: undefined,
    currentError: null,
    currentMessage: null
};

export const INITIAL_STORE_STATE: StoreState = {
    taskList: todoListInitState,
    taskItem: todoItemInitState
};

export const INITIAL_APPLICATION_STATE: ApplicationState = {
    uiState: INITIAL_UI_STATE,
    storeState: INITIAL_STORE_STATE
};
