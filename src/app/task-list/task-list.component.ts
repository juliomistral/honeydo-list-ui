import {AfterViewChecked, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {Store} from '@ngrx/store';
import {TodoTaskNodeVM} from '@src/app/task-list/task-item/view-model';
import {TodoListVM} from '@src/app/task-list/view-model';

interface FlatTodoTaskNode {
    id: number;
    level: number;
    expandable: boolean;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, AfterViewChecked {
    @Input() todoList: TodoListVM;
    @Input() rootTodoTaskNode: TodoTaskNodeVM;

    treeControl: FlatTreeControl<FlatTodoTaskNode>;
    nodeFlatner: MatTreeFlattener<TodoTaskNodeVM, FlatTodoTaskNode>;
    dataSource: MatTreeFlatDataSource<TodoTaskNodeVM, FlatTodoTaskNode>;

    static _transformer(todoTask: TodoTaskNodeVM, level: number): FlatTodoTaskNode {
        return {
            id: todoTask.id,
            level: level,
            expandable: todoTask.subNodes.length > 0
        };
    }

    constructor(
      private store: Store<{}>,
      private changeDetectorRef: ChangeDetectorRef) {

        this.treeControl = new FlatTreeControl<FlatTodoTaskNode>(
            dataNode => dataNode.level,
            dataNode => dataNode.expandable
        );

        this.nodeFlatner = new MatTreeFlattener<TodoTaskNodeVM, FlatTodoTaskNode>(
            TaskListComponent._transformer,
            node => node.level,
            node => node.expandable,
            node => node.subNodes,
        );

        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.nodeFlatner);
    }

    ngOnInit() {
        this.dataSource.data = this.rootTodoTaskNode.subNodes;
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

    handleTaskDrop(event: CdkDragDrop<FlatTodoTaskNode>) {
        const draggedTask: FlatTodoTaskNode = this.treeControl.dataNodes[event.previousIndex];
        const dropTargetTask: FlatTodoTaskNode = this.treeControl.dataNodes[event.currentIndex];

        console.log(`Prev. index: ${event.previousIndex}`);
        console.log(`...dragged task:  ${draggedTask}`);
        console.log(`...drop target task:  ${dropTargetTask}`);
    }
}
