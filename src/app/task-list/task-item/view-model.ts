/**
 * Node representing a TodoTask within a tree structure.
 *
 * Each node MUST only contains IDs - no other data about a task
 * SHOULD BE in the node class.
 */
export class TodoTaskNodeVM {
    /** ID of the task this node represents*/
    id: number;
    /** Task ID of this node's parent */
    parentId?: number;
    /** Task ID of this node's children */
    children?: TodoTaskNodeVM[];


    constructor(id: number = null,
                parentId: number = null,
                children: TodoTaskNodeVM[] = []) {
        this.id = id;
        this.parentId = parentId;
        this.children = children;
    }

    public toString(): string {
        return `[${this.id}] Sub nodes length = ${this.children.length}`;
    }
}
