import {Action, createReducer, on} from '@ngrx/store';
import * as todoTaskActions from 'src/app/task-list/task-item/store/actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {TodoTask} from '@src/app/model/todolist';


export const todoTaskFeatureKey = 'taskItems';

export const todoTaskAdapter: EntityAdapter<TodoTask> = createEntityAdapter<TodoTask>({
    selectId: model => model.id
});

export interface TodoTaskState extends EntityState<TodoTask> {
    isLoading?: boolean;
    error?: string;
}

export const initialState: TodoTaskState = todoTaskAdapter.getInitialState({
    isLoading: true,
    error: null
});


const todoTaskReducers = createReducer(
    initialState,
    on(
        todoTaskActions.rootTodoTasksLoaded,
        (state, action) => {
            return todoTaskAdapter.addAll(
                action.tasks, {
                    ...state,
                    isLoading: false
                }
            );
        }
    )
);

export function reducer(state: TodoTaskState | undefined, action: Action) {
    return todoTaskReducers(state, action);

}
