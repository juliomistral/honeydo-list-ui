import {appInitialStateLoadedAction, errorAction} from './actions';
import {initialState as RootInitialState, AppState} from './state';
import {Action, createReducer, on} from '@ngrx/store';

export const rootReducerKey = 'appState';

const rootReducers = createReducer(
    RootInitialState,
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
            currentListI: action.data.currentListId
        })
    )
);

export function reducer(state: AppState | undefined, action: Action) {
    return rootReducers(state, action);
}
