import {Action, createReducer, on} from '@ngrx/store';
import * as todoTaskActions from 'src/app/task-list/task-item/store/actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {TodoTask} from '@src/app/model/todolist';


export const featureKey = 'taskItems';

export const adapter: EntityAdapter<TodoTask> = createEntityAdapter<TodoTask>({
    selectId: model => model.id
});

export interface State extends EntityState<TodoTask> {
    isLoading: boolean;
}

export const initialState: State = adapter.getInitialState({
    isLoading: true,
});

const todoTaskReducers = createReducer(
    initialState,
    on(
        todoTaskActions.rootTodoTasksLoaded,
        (state, action) => {
            return adapter.addAll(
                action.tasks, {
                    ...state,
                    isLoading: false
                }
            );
        }
    )
);

export function reducer(state: State | undefined, action: Action) {
    return todoTaskReducers(state, action);
}
