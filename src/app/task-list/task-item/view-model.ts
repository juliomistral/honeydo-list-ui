import {TaskStatus} from '@src/app/model/todolist';

export interface TodoTaskVM {
    id: number;
    name: string;
    status: TaskStatus;
}

export class TodoTaskNodeVM {
    id: number;
    parentId?: number;
    subNodes?: TodoTaskNodeVM[];

    toString = (): string => {
        return `[${this.id}] Sub nodes length = ${this.subNodes.length}`;
    }
}
