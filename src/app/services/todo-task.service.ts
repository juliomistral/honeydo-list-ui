import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoTask } from '@src/app/model/todolist';
import { plainToClass } from 'class-transformer';
import * as fromMockData from './mock-data';


@Injectable({
  providedIn: 'root'
})
export class TodoTaskService {
  constructor() { }

  getTasksForRootTaskId(rootTaskId: number): Observable<TodoTask[]> {
    const tasks: TodoTask[] = plainToClass(TodoTask, fromMockData.MOCK_TODO_TASKS);

    return new Observable<TodoTask[]>(subscriber => {
      subscriber.next(tasks);
    });
  }
}
