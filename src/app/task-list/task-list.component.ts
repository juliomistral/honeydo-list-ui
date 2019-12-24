import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import { TodoTask } from '@src/app/model/todolist';
import { TodoTaskService } from '@src/app/services/todo-task.service';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Todolist } from '@src/app/model/todolist';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import { CollectionViewer } from '@angular/cdk/collections';
import {TodoListService} from '@src/app/services/todo-list.service';

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
  @Input() listId: number;
  treeControl: FlatTreeControl<FlatTodoTaskNode>;
  nodeFlatner: MatTreeFlattener<TodoTask, FlatTodoTaskNode>;
  dataSource: MatTreeFlatDataSource<TodoTask, FlatTodoTaskNode>;
  todoList: Todolist;

  constructor(
      todoTaskService: TodoTaskService,
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

    todoTaskService.getRootTaskForList(this.listId).subscribe(
        rootTask => this._registerRootTask(rootTask)
    );
    todoListService.getTodoList(this.listId).subscribe(value => {
      this.todoList = value;
    });
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

  private _registerRootTask(rootTask: TodoTask) {
    this.dataSource.data = rootTask.subTasks;
    console.log(`...flattened nodes:  ${this.treeControl.dataNodes}`);
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
    const draggedTask: TodoTask = this.treeControl.dataNodes[event.previousIndex].todoTask;
    const dropTargetTask: TodoTask = this.treeControl.dataNodes[event.currentIndex].todoTask;

    console.log(`Prev. index: ${event.previousIndex}`);
    console.log(`...dragged task:  ${draggedTask}`);
    console.log(`...drop target task:  ${dropTargetTask}`);
  }
}
