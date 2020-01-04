import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TaskStatus, TodoTask} from '@src/app/model/todolist';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {selectTodoTaskById} from '@src/app/task-list/task-item/store/selectors';

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
    this.todoTask$ = this.store$.pipe(select(selectTodoTaskById, { id: this.todoTaskId }));
    console.log(`subscribing to task in constructor...`);
  }

  ngOnInit() {
    this.todoTask$.subscribe(todoTask => {
      console.log('subscring to task in ngOnInit');
      this.taskNameFormControl = new FormControl(todoTask.name);
      this.taskNameFormControl.valueChanges.subscribe(newName => this.updateTaskName(newName) );
    });
  }

  markTaskAsStarted() {
  }

  markTaskAsCompleted() {
  }

  private updateTaskName(newName: string) {
  }
}
