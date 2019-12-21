import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { TodoTask } from '@src/app/model/todolist';
import { TodoListService } from '@src/app/services/todo-list.service';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Todolist } from '@src/app/model/todolist';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import { CollectionViewer } from '@angular/cdk/collections';

interface FlatTodoTaskNode {
    id: number;
    name: string;
    level: number;
    expandable: boolean;
    todoTask: TodoTask;
    toString(): string;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, AfterViewChecked {
  treeControl: FlatTreeControl<FlatTodoTaskNode>;
  nodeFlatner: MatTreeFlattener<TodoTask, FlatTodoTaskNode>;
  dataSource: MatTreeFlatDataSource<TodoTask, FlatTodoTaskNode>;
  todoList: Todolist;

  constructor(
      todoListService: TodoListService,
      private changeDetectorRef: ChangeDetectorRef
  ) {
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

  ngAfterViewChecked(): void {
    // Without forcing change detection after the default change detector has finished, the
    // drag-and-drop will produce the following JS error:
    //   Uncaught TypeError: Cannot read property '_getSiblingContainerFromPosition' of undefined
    //
    // For more info, see bug https://github.com/angular/components/issues/15948
    this.changeDetectorRef.detectChanges();
  }

  private getSubTasks = (item: TodoTask) => item.subTasks;
  private hasChild = (_: number, node: FlatTodoTaskNode) => node.expandable;

  private _registerRetrievedList(todolist: Todolist) {
    this.dataSource.data = todolist.rootTask.subTasks;
    this.todoList = todolist;
  }

  private _transformer = (todoTask: TodoTask, level: number) => {
    return {
      id: todoTask.id,
      name: todoTask.name,
      level: level,
      expandable: todoTask.hasChildren(),
      todoTask: todoTask,
      toString: function () {
        return this.todoTask.toString();
      }
    };
  }

  handleTaskDrop(event: CdkDragDrop<TodoTask[]>) {
    console.log(`Prev. index: ${event.previousIndex}, New Index: ${event.currentIndex}`);
    console.log(`...flattened nodes:  ${this.dataSource.data}`);
  }
}
