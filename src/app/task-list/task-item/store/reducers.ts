import {Action, createReducer, on} from '@ngrx/store';
import * as toTodoTask from 'src/app/task-list/task-item/store/actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {TodoTask} from '@src/app/model/todolist';


export const featureKey = 'taskItems';

export const adapter: EntityAdapter<TodoTask> = createEntityAdapter<TodoTask>();
export interface State extends EntityState<TodoTask> {}
export const initialState: State = adapter.getInitialState();

const todoTaskReducers = createReducer(
    initialState,
    on(
        toTodoTask.rootTodoTasksLoaded,
        (state, action) => adapter.addAll(action.tasks, state)
    ),
    on(
        toTodoTask.todoTasksUpdated,
        (state, action) => adapter.updateMany(action.updatedTasks, state)
    ),
);

export function reducer(state: State | undefined, action: Action) {
    return todoTaskReducers(state, action);
}
