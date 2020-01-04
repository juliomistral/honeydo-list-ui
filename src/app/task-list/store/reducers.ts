import {Action, createReducer, on} from '@ngrx/store';
import * as todolistActions from './actions';
import {Todolist} from '@src/app/model/todolist';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';


export const featureKey = 'taskLists';

export const adapter: EntityAdapter<Todolist> = createEntityAdapter<Todolist>({
    selectId: model => model.id
});

export interface State extends EntityState<Todolist> {
    isLoading: boolean;
}

export const initialState: State = adapter.getInitialState({
    isLoading: true,
});

const todoListReducers = createReducer(
    initialState,
    on(
        todolistActions.todoListLoadedAction,
        (state, action) => adapter.addOne(
            action.todoList, {
                ...state,
                isLoading: false
            })
    )
);

export function reducer(state: State | undefined, action: Action) {
    return todoListReducers(state, action);
}
