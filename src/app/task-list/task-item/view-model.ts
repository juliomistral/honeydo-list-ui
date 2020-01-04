import {TaskStatus} from '@src/app/model/todolist';

export interface TodoTaskVM {
    id: number;
    name: string;
    status: TaskStatus;
}

export interface TodoTaskNodeVM {
    id: number;
    parentId?: number;
    subNodes?: TodoTaskNodeVM[];
}
