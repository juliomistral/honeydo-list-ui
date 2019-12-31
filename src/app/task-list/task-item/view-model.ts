import {TaskStatus} from '@src/app/model/todolist';

export interface TodoTaskVM {
    name: string;
    status: TaskStatus;
    subTasks: TodoTaskVM[];
}
