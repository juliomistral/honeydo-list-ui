import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() todoTask;
  completedFormControl;
  taskNameFormControl;

  constructor() {
  }

  ngOnInit() {
    this.completedFormControl = new FormControl(this.todoTask.isCompleted());
    this.taskNameFormControl = new FormControl(this.todoTask.name);
  }

}
