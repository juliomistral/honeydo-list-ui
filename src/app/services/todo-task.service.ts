import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskStatus, TodoTask } from '@src/app/model/todolist';
import { ModelUtils } from '@src/app/model/model-utils';
import { plainToClass } from 'class-transformer';

const ROOT_ID = ModelUtils.generateRandomId();
const TASK_1_ID = ModelUtils.generateRandomId();
const TASK_2_ID = ModelUtils.generateRandomId();
const TASK_3_ID = ModelUtils.generateRandomId();
const TASK_3_A_ID = ModelUtils.generateRandomId();
const TASK_3_B_ID = ModelUtils.generateRandomId();

const TASK_TEST_DATA = {
  id: ROOT_ID,
  name: '',
  subTasks: [{
    id: TASK_1_ID,
    name: 'Go to Safeway',
    parentId: ROOT_ID,
    status: TaskStatus.COMPLETED
  }, {
    id: TASK_2_ID,
    name: 'Do laundry',
    parentId: ROOT_ID,
    status: TaskStatus.IN_PROGRESS,
  }, {
    id: TASK_3_ID,
    name: 'Hang up picture',
    parentId: ROOT_ID,
    subTasks: [{
        id: TASK_3_A_ID,
        name: 'Go to HomeDepot to get hooks',
        parentId: TASK_3_ID,
        status: TaskStatus.IN_PROGRESS
      }, {
        id: TASK_3_B_ID,
        name: 'Pick up new frame',
        parentId: TASK_3_ID,
        status: TaskStatus.IN_PROGRESS,
    }]
  }]
};

@Injectable({
  providedIn: 'root'
})
export class TodoTaskService {
  constructor() { }

  getTasksForRootTaskId(rootTaskId: number): Observable<TodoTask> {
    const rootTask: TodoTask = plainToClass(TodoTask, TASK_TEST_DATA);

    return new Observable<TodoTask>(subscriber => {
      subscriber.next(rootTask);
    });
  }
}
