import { Todolist, TodoTask } from '@src/app/model/todolist';

export interface AllEntityData {
    todoList: Todolist[];
    todoTask: TodoTask[];
}

export interface AllUiData {
    currentUserId: number;
    currentListId: number;
}
