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
    id: string;
    name: string;
    parent: TodoTask;
    subTasks: TodoTask[];
    status: TaskStatus;

    constructor(id: string, name: string, parent: TodoTask, subTasks: TodoTask[], status: TaskStatus) {
        this.id = id;
        this.name = name;
        this.parent = parent;
        this.subTasks = subTasks;
        this.status = status;
    }

    public addSubTask(id: string, name: string) {
        const subTask = new TodoTask(id, name, this, [], TaskStatus.NOT_STARTED);
        this.subTasks.push(subTask);
    }
    public hasChildren(): boolean {
        return this.subTasks.length > 0;
    }

    public isCompleted(): boolean {
        return this.status === TaskStatus.COMPLETED;
    }

    public toString(): string {
        return this.name + ' ( ' + this.status + ' )';
    }
}
