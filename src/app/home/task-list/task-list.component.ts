import { Component, OnInit } from '@angular/core';
import { TodoTask } from '@src/app/model/todolist';
import { MatTreeNestedDataSource } from '@angular/material';
import { TodoListService } from '@src/app/services/todo-list.service';
import { NestedTreeControl} from '@angular/cdk/tree';
import { Todolist } from '@src/app/model/todolist';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  nestedTreeControl: NestedTreeControl<TodoTask>;
  nestedDataSource: MatTreeNestedDataSource<TodoTask>;
  todoList: Todolist;
  name: FormControl;

  constructor(todoListService: TodoListService) {
    this.nestedTreeControl = new NestedTreeControl<TodoTask>(this.getSubTasks);
    this.nestedDataSource = new MatTreeNestedDataSource();
    this.name = new FormControl('');

    todoListService.getTodoList('SOME_ID').subscribe(
        todoList => this.registerRetrievedList(todoList)
    );
  }

  ngOnInit() {}

  private getSubTasks = (item: TodoTask) => item.subTasks;

  private registerRetrievedList(todolist: Todolist) {
    this.nestedDataSource.data = todolist.rootTask.subTasks;
    this.todoList = todolist;
  }

  hasSubTasks = (_: number, task: TodoTask) => task.hasChildren();
}
