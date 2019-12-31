import {TodoTaskVM} from '@src/app/task-list/task-item/view-model';

export interface TodoListVM {
    name: string;
    description: string;
    rootTask: TodoTaskVM;
}
