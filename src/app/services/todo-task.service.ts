import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {TaskStatus, TodoTask} from '@src/app/model/todolist';
import { plainToClass } from 'class-transformer';
import * as fromMockData from './mock-data';
import {Update} from '@ngrx/entity';
import {select, Store} from '@ngrx/store';
import {selectTodoTaskById} from '@src/app/task-list/task-item/store/selectors';
import {take} from 'rxjs/operators';
import {MoveDirection} from '../task-list/store/actions';


@Injectable({
  providedIn: 'root'
})
export class TodoTaskService {
  constructor(private store$: Store<{}>) { }

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

  moveTaskToNewPosition(movedTaskId: number, targetTaskId: number, direction: MoveDirection):  Observable<Update<TodoTask>[]> {
      const targetTask: TodoTask = this._retrieveTaskFromStore(targetTaskId);
      const targetParentTask: TodoTask = this._retrieveTaskFromStore(targetTask.parentId);

      const movedTask: TodoTask = this._retrieveTaskFromStore(movedTaskId);
      const movedParentTask: TodoTask = this._retrieveTaskFromStore(movedTask.parentId);

      // TODO:  Refactor task move logic
      // TODO:    1) Handle case when target is last child of a sibling task
      // TODO:    2) Handle case where simple sibling move
      // TODO:    3) Use direction of placement (above/below) to determine target location

      // Simple mock impl:
      // 1.  Remove moved task from parents sub tasks
      const movedParentSubTasks: number[] = movedParentTask.subTaskIds;
      const movedIndexInSubTasks: number = movedParentSubTasks.findIndex(value => movedTaskId === value);
      movedParentSubTasks.splice(movedIndexInSubTasks, 1);

      // 2.  Add moving task to sibling's parent, after the sibling
      const targetParentSubTasks: number[] = targetParentTask.subTaskIds;
      const targetIndexInSubTasks: number = targetParentSubTasks.findIndex(value => targetTaskId === value);

      // 3.  Use direction to determine offset
      const insertionPoint: number = (direction === MoveDirection.DOWN ?
          targetIndexInSubTasks + 1 :
          targetIndexInSubTasks);
      targetParentSubTasks.splice(insertionPoint, 0, movedTaskId);

      return new Observable<Update<TodoTask>[]>(subscriber => {
          subscriber.next([
              {
                  id: targetParentTask.id,
                  changes: { subTaskIds: targetParentSubTasks }
              }, {
                  id: movedParentTask.id,
                  changes: { subTaskIds: movedParentSubTasks }
              }, {
                  id: movedTaskId,
                  changes: { parentId: targetParentTask.id }
              }
          ]);
      });
  }

  private _retrieveTaskFromStore(id: number): TodoTask {
      let task: TodoTask;

      this.store$.pipe(
          select(selectTodoTaskById, {id: id}),
          take(1)
      ).subscribe(value => task = value);

      return task;
  }
}
