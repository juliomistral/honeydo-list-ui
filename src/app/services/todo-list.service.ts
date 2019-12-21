import {Injectable} from '@angular/core';
import {Observable, of as observableOf} from 'rxjs';
import {TaskStatus, Todolist, TodoTask} from '@src/app/model/todolist';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  constructor() { }

  private _emitSampleList(observer) {
    const rootTask: TodoTask = new TodoTask(
        Math.random(),
        null,
        null,
        <TodoTask[]>[],
        TaskStatus.COMPLETED
    );

    rootTask.subTasks.push(
        new TodoTask(Math.random(), 'Go to Safeway', rootTask, [], TaskStatus.COMPLETED),
        new TodoTask(Math.random(), 'Do Laundry', rootTask, [], TaskStatus.IN_PROGRESS),
        new TodoTask(Math.random(), 'Hang picture in bedroom', rootTask, [], TaskStatus.NOT_STARTED),
    );
    rootTask.subTasks[2].addSubTask(Math.random(), 'Buy hooks at Home Depot');
    rootTask.subTasks[2].addSubTask(Math.random(), 'Buy frame at Target');

    observer.next(
        new Todolist(
            '1234',
            'Adulting',
            rootTask
        )
    );
  }

  getTodoList(listId: string): Observable<Todolist> {
    return new Observable<Todolist>(this._emitSampleList);
  }
}
