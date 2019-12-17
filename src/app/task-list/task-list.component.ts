import { Component, OnInit } from '@angular/core';
import { TodoTask } from '@src/app/model/todolist';
import { TodoListService } from '@src/app/services/todo-list.service';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Todolist } from '@src/app/model/todolist';
import { FormControl } from '@angular/forms';

interface FlatTodoTaskNode {
    name: string;
    level: number;
    expandable: boolean;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  treeControl: FlatTreeControl<FlatTodoTaskNode>;
  nodeFlatner: MatTreeFlattener<TodoTask, FlatTodoTaskNode>;
  dataSource: MatTreeFlatDataSource<TodoTask, FlatTodoTaskNode>;
  todoList: Todolist;

  private _transformer = (todoTask: TodoTask, level: number) => {
    return {
      name: todoTask.name,
      level: level,
      expandable: todoTask.hasChildren()
    };
  }

  constructor(todoListService: TodoListService) {
    this.treeControl = new FlatTreeControl<FlatTodoTaskNode>(
        dataNode => dataNode.level,
        dataNode => dataNode.expandable
    );
    this.nodeFlatner = new MatTreeFlattener<TodoTask, FlatTodoTaskNode>(
        this._transformerm,
            node => node.level,
        node => node.expandable,
            node => node.subTasks
    );

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
