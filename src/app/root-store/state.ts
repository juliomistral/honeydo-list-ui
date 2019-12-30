import {Todolist, TodoTask} from '@src/app/model/todolist';
import {TodoListActions, TodoListState} from 'src/app/task-list/store';
import {TodoItemActions, TodoItemState} from 'src/app/task-list/task-item/store';

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
    taskList: TodoListState.State;
    taskItem: TodoItemState.State;
}

export const INITIAL_UI_STATE: UiState = {
    userId: undefined,
    currentListId: undefined,
    currentError: null,
    currentMessage: null
};

export const INITIAL_STORE_STATE: StoreState = {
    taskList: TodoListState.initialState,
    taskItem: TodoItemState.initialState
};

export const INITIAL_APPLICATION_STATE: ApplicationState = {
    uiState: INITIAL_UI_STATE,
    storeState: INITIAL_STORE_STATE
};
