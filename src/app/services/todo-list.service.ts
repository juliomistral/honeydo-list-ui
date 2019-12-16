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
        '1234',
        null,
        null,
        <TodoTask[]>[],
        TaskStatus.COMPLETED
    );

    rootTask.subTasks.push(
        new TodoTask('5678', 'Go to Safeway', rootTask, [], TaskStatus.NOT_STARTED),
        new TodoTask('5678', 'Do Laundry', rootTask, [], TaskStatus.NOT_STARTED),
        new TodoTask('5678', 'Hang picture in bedroom', rootTask, [], TaskStatus.NOT_STARTED),
    );
    rootTask.subTasks[2].addSubTask('6785', 'Buy hooks at Home Depot');
    rootTask.subTasks[2].addSubTask('6785', 'Buy frame at Target');

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
