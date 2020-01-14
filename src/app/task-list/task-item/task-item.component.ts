import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TaskStatus, TodoTask} from '@src/app/model/todolist';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {selectTodoTaskById} from '@src/app/task-list/task-item/store/selectors';
import * as toTodoTask from '@src/app/task-list/task-item/store/actions';


@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() todoTaskId: number;
  todoTaskStream$: Observable<TodoTask>;
  currentTask: TodoTask;
  taskNameControl: FormControl;
  taskStatusControl: FormControl;

  constructor(private store$: Store<{}>) {}

  ngOnInit() {
    this.todoTaskStream$ = this.store$.pipe(
        select(selectTodoTaskById, { id: this.todoTaskId })
    );

    this.todoTaskStream$.subscribe(todoTask => {
      this.currentTask = todoTask;
      this.taskNameControl = new FormControl(this.currentTask.name);
      this.taskStatusControl = new FormControl(this.currentTask.status === TaskStatus.COMPLETED);
    });
  }

  isTaskCompleted(): boolean { return this.currentTask.status === TaskStatus.COMPLETED; }

  toggleTaskStatus() {
    if (this.currentTask.status === TaskStatus.COMPLETED) {
      this.store$.dispatch(toTodoTask.markTaskAsStartedAction({ taskId: this.currentTask.id }));
    } else {
      this.store$.dispatch(toTodoTask.markTaskAsCompletedAction({ taskId: this.currentTask.id }));
    }
  }

  updateTaskName() {
    if (!this.taskNameControl.dirty) {
      return;
    }

    const newName: string = this.taskNameControl.value;
    this.store$.dispatch(
        toTodoTask.updateTodoTaskProperties({ updatedTask: {
          id: this.currentTask.id,
          changes: { name: newName }
        }})
    );
  }
}
