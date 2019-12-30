import {ErrorAction, AppInitialStateLoadedAction} from './actions';
import {INITIAL_UI_STATE, UiState} from './state';
import {Action, createReducer, on} from '@ngrx/store';


export const rootReducerKey = 'uiState';

const rootReducers = createReducer(
    INITIAL_UI_STATE,
    on(
        ErrorAction,
        (state, action) => ({
            ...state,
            currentError: action.msg
        })
    ),
    on (
        AppInitialStateLoadedAction,
        (state, action) => ({
            ...state,
            userId: action.data.currentUserId,
            currentListI: action.data.currentListId
        })
    )
);

export function reducer(state: UiState | undefined, action: Action) {
    return rootReducers(state, action);
}
