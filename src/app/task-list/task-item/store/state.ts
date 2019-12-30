import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { TodoTask } from '@src/app/model/todolist';

export const todoTaskAdapter: EntityAdapter<TodoTask> = createEntityAdapter<TodoTask>({
    selectId: model => model.id
});

export interface State extends EntityState<TodoTask> {
    isLoading?: boolean;
    error?: string;
}

export const initialState: State = todoTaskAdapter.getInitialState(
    {
        isLoading: false,
        error: null
    }
);
