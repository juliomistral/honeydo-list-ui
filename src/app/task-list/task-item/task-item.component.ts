import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TaskStatus, TodoTask} from '@src/app/model/todolist';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() todoTask: TodoTask;
  taskNameFormControl: FormControl;
  taskStatus: TaskStatus;
  editMode: boolean;

  constructor() {}

  ngOnInit() {
    this.taskNameFormControl = new FormControl(this.todoTask.name);
    this.taskNameFormControl.valueChanges.subscribe(value => this.updateTaskName(value) );
    this.taskStatus = this.todoTask.status;
  }

  markTaskAsStarted() {
    this.todoTask.status = TaskStatus.IN_PROGRESS;
    this.saveTask();
    this.ngOnInit();
  }

  markTaskAsCompleted() {
    this.todoTask.status = TaskStatus.COMPLETED;
    this.saveTask();
    this.ngOnInit();
  }

  private updateTaskName(value: string) {
    this.todoTask.name = value;
  }

  private saveTask() {
    console.log('Syncing task with backend: ' + this.todoTask);
    this.editMode = false;
    this.ngOnInit();
  }
}
