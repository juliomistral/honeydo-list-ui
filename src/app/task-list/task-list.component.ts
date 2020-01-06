import {AfterViewChecked, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {Store} from '@ngrx/store';
import {TodoTaskNodeVM} from '@src/app/task-list/task-item/view-model';
import {Todolist} from '../model/todolist';
import * as toTodoList from '@src/app/task-list/store/actions';


interface FlatTodoTaskNode extends Object {
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
    @Input() todoList: Todolist;
    @Input() rootTodoTaskNode: TodoTaskNodeVM;

    treeControl: FlatTreeControl<FlatTodoTaskNode>;
    nodeFlatner: MatTreeFlattener<TodoTaskNodeVM, FlatTodoTaskNode>;
    dataSource: MatTreeFlatDataSource<TodoTaskNodeVM, FlatTodoTaskNode>;

    static _transformer(todoTask: TodoTaskNodeVM, level: number): FlatTodoTaskNode {
        return {
            id: todoTask.id,
            level: level,
            expandable: todoTask.children.length > 0,
            toString: () => `Flat node ID:  ${todoTask.id}`
        };
    }

    constructor(
      private store$: Store<{}>,
      private changeDetectorRef: ChangeDetectorRef) {

        this.treeControl = new FlatTreeControl<FlatTodoTaskNode>(
            dataNode => dataNode.level,
            dataNode => dataNode.expandable
        );

        this.nodeFlatner = new MatTreeFlattener<TodoTaskNodeVM, FlatTodoTaskNode>(
            TaskListComponent._transformer,
            node => node.level,
            node => node.expandable,
            node => node.children,
        );

        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.nodeFlatner);
    }

    ngOnInit() {
        this.dataSource.data = this.rootTodoTaskNode.children;
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

        this.store$.dispatch(toTodoList.moveTaskToNewPositionAction({
            movedTaskId: draggedTask.id,
            targetTaskId: dropTargetTask.id
        }));
    }
}
