import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
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
  todoTask$: Observable<TodoTask>;
  taskNameFormControl: FormControl;
  taskStatus: TaskStatus;

  constructor(private store$: Store<{}>) {
  }

  ngOnInit() {
    this.todoTask$ = this.store$.pipe(select(selectTodoTaskById, { id: this.todoTaskId }));
    this.todoTask$.subscribe(todoTask => {
      this.taskNameFormControl = new FormControl(todoTask.name);
    });
  }

  markTaskAsStarted() {
    this.store$.dispatch(toTodoTask.markTaskAsStartedAction({ taskId: this.todoTaskId }));
  }

  markTaskAsCompleted() {
    this.store$.dispatch(toTodoTask.markTaskAsCompletedAction({ taskId: this.todoTaskId }));
  }

  updateTaskName() {
    if (!this.taskNameFormControl.dirty) {
      return;
    }

    const newName: string = this.taskNameFormControl.value;
    this.store$.dispatch(
        toTodoTask.updateTodoTaskPropertiesAction({
          id: this.todoTaskId,
          name: newName
        })
    );
  }
}
