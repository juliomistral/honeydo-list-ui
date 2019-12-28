import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { TodoTask } from '@src/app/model/todolist';

export const todoTaskAdapter: EntityAdapter<TodoTask> = createEntityAdapter<TodoTask>({
    selectId: model => model.id
});

export interface TaskItemState extends EntityState<TodoTask> {
    isLoading?: boolean;
    error?: string;
}

export const initialState: TaskItemState = todoTaskAdapter.getInitialState(
    {
        isLoading: false,
        error: null
    }
);
