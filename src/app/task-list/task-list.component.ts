import { Component, OnInit } from '@angular/core';
import { TodoTask } from '@src/app/model/todolist';
import { TodoListService } from '@src/app/services/todo-list.service';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Todolist } from '@src/app/model/todolist';

interface FlatTodoTaskNode {
    name: string;
    level: number;
    expandable: boolean;
    todoTask: TodoTask;
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

  constructor(todoListService: TodoListService) {
    this.treeControl = new FlatTreeControl<FlatTodoTaskNode>(
        dataNode => dataNode.level,
        dataNode => dataNode.expandable
    );
    this.nodeFlatner = new MatTreeFlattener<TodoTask, FlatTodoTaskNode>(
        this._transformer,
        node => node.level,
        node => node.expandable,
        node => node.subTasks,
    );
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.nodeFlatner);

    todoListService.getTodoList('SOME_ID').subscribe(
        todoList => this._registerRetrievedList(todoList)
    );
  }

  ngOnInit() {
    this.treeControl.expandAll();
  }

  private getSubTasks = (item: TodoTask) => item.subTasks;

  hasChild = (_: number, node: FlatTodoTaskNode) => node.expandable;

  private _registerRetrievedList(todolist: Todolist) {
    this.dataSource.data = todolist.rootTask.subTasks;
    this.todoList = todolist;
  }

  private _transformer = (todoTask: TodoTask, level: number) => {
    return {
      name: todoTask.name,
      level: level,
      expandable: todoTask.hasChildren(),
      todoTask: todoTask
    };
  }
}
