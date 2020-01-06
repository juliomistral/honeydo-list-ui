import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {TaskStatus, TodoTask} from '@src/app/model/todolist';
import { plainToClass } from 'class-transformer';
import * as fromMockData from './mock-data';
import {Update} from '@ngrx/entity';


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

  updateTodoTask(updateInfo: Update<TodoTask>): Observable<Update<TodoTask>> {
      return new Observable<Update<TodoTask>>(subscriber => {
          subscriber.next(updateInfo);
      });
  }

  updateTodoTaskStatus(taskId: number, newStatus: TaskStatus): Observable<Update<TodoTask>> {
      return new Observable<Update<TodoTask>>(subscriber => {
          const updatedTask: Update<TodoTask> = {
              id: taskId,
              changes: {status: newStatus}
          };
          subscriber.next(updatedTask);
      });
  }
}
