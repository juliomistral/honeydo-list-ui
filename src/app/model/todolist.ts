import { Type } from "class-transformer";


export enum TaskStatus {
    NOT_STARTED,
    IN_PROGRESS,
    ON_HOLD,
    COMPLETED
}

export class Todolist {
    id: string;
    name: string;
    rootTask: TodoTask;

    constructor(id: string, name: string, rootTask: TodoTask) {
        this.id = id;
        this.name = name;
        this.rootTask = rootTask;
    }
}

export class TodoTask {
    id: number;
    name: string;
    status?: TaskStatus;
    parent?: TodoTask;
    @Type(type => TodoTask)
    subTasks?: TodoTask[];

    constructor(id: number,
                name: string,
                status = TaskStatus.NOT_STARTED,
                parent = null,
                subTasks = [] as TodoTask[]) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.parent = parent;
        this.subTasks = subTasks;
    }

    public addSubTask(subTask:  TodoTask) {
        subTask.parent = this.parent;
        this.subTasks.push(subTask);
    }

    public hasChildren(): boolean {
        return this.subTasks.length > 0;
    }

    public isCompleted(): boolean {
        return this.status === TaskStatus.COMPLETED;
    }

    public isRoot(): boolean {
        return this.parent = null;
    }

    public toString(): string {
        return `[${this.id}] ${this.name} (${this.status})`;
    }
}
