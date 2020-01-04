import {appInitialStateLoadedAction, errorAction} from './actions';
import {Action, createReducer, on} from '@ngrx/store';
import * as fromTodoList from '@src/app/task-list/store/reducers';
import * as fromTodoTask from '@src/app/task-list/task-item/store/reducers';


export const featureKey = 'appState';

export interface State {
    userId: number;
    currentListId: number;
    currentError?: string;
    currentMessage?: string;
}

export const initialState: State = {
    userId: null,
    currentListId: null,
    currentError: null,
    currentMessage: null
};

const rootReducers = createReducer(
    initialState,
    on(
        errorAction,
        (state, action) => ({
            ...state,
            currentError: action.msg
        })
    ),
    on(
        appInitialStateLoadedAction,
        (state, action) => ({
            ...state,
            userId: action.data.currentUserId,
            currentListId: action.data.currentListId
        })
    )
);

export function reducers(state: State | undefined, action: Action) {
    return rootReducers(state, action);
}
