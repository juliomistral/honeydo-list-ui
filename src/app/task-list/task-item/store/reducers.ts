import {createReducer, on} from '@ngrx/store';
import {initialState as TodoTaskInitialState, TodoTaskState} from 'src/app/task-list/task-item/store/state';
import * as TodoTaskActions from 'src/app/task-list/task-item/store/actions';
export const todoTaskReducerKey = 'taskItem';

const todoTaskReducers = createReducer(
    TodoTaskInitialState,
    on(
        TodoTaskActions.todoTasksLoaded,
        (state, action) => ({
            ...state,
            isLoading: false
        })
    )
);
