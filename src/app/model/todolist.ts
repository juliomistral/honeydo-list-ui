
export enum TaskStatus {
    NOT_STARTED = 'NOT_STARTED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED'
}

export class Todolist {
    id: number;
    name: string;
    rootTaskId: number;
    description?: string;

    constructor(id: number, name: string, rootTaskId: number, description = null) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.rootTaskId = rootTaskId;
    }
}

export class TodoTask {
    id: number;
    name: string;
    status?: TaskStatus;
    parentId: number;
    subTaskIds?: number[];

    constructor(id: number,
                name: string,
                status = TaskStatus.NOT_STARTED,
                parent = null,
                subTaskIds = [] as number[]) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.parentId = parent;
        this.subTaskIds = subTaskIds;
    }

    public hasChildren(): boolean {
        return this.subTaskIds.length > 0;
    }

    public isCompleted(): boolean {
        return this.status === TaskStatus.COMPLETED;
    }

    public isRoot(): boolean {
        return this.parentId = null;
    }

    public toString(): string {
        return `[${this.id}] ${this.name} (${this.status})`;
    }
}
