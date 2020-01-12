import {AfterViewChecked, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {Observable} from 'rxjs';
import {FlatTreeControl} from '@angular/cdk/tree';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {select, Store} from '@ngrx/store';
import {TodoTaskNodeVM} from '@src/app/task-list/task-item/view-model';
import {Todolist} from '../model/todolist';
import * as toTodoList from '@src/app/task-list/store/actions';
import {MoveDirection} from '@src/app/task-list/store/actions';
import {selectCurrentTodoList} from '@src/app/task-list/store/selectors';
import {selectTodoTaskNodesForCurrentList} from '@src/app/task-list/task-item/store/selectors';


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
    @Input() todoListId: number;
    @Input() rootTodoTaskId: number;

    treeControl: FlatTreeControl<FlatTodoTaskNode>;
    nodeFlatner: MatTreeFlattener<TodoTaskNodeVM, FlatTodoTaskNode>;
    dataSource: MatTreeFlatDataSource<TodoTaskNodeVM, FlatTodoTaskNode>;

    todoListStream$: Observable<Todolist>;
    rootTodoTaskNodeStream$: Observable<TodoTaskNodeVM>;
    todoList: Todolist;
    rootTodoTask: TodoTaskNodeVM;

    static _transformer(todoTask: TodoTaskNodeVM, level: number): FlatTodoTaskNode {
        return {
            id: todoTask.id,
            level: level,
            expandable: todoTask.children.length > 0
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
        this._subscribeToTodoList();
        this._subscribeToTodoTask();
        this._initTreeForRendering();
    }

    ngAfterViewChecked(): void {
        // Without forcing change detection after the default change detector has finished, the
        // drag-and-drop will produce the following JS error:
        //   Uncaught TypeError: Cannot read property '_getSiblingContainerFromPosition' of undefined
        //
        // For more info, see bug https://github.com/angular/components/issues/15948
        this.changeDetectorRef.detectChanges();
    }

    private _subscribeToTodoList() {
        this.todoListStream$ = this.store$.pipe(select(selectCurrentTodoList));
        this.todoListStream$.subscribe(value => {
            console.log('...getting updated todo list from store...', value);
            return this.todoList = value;
        });
    }

    private _subscribeToTodoTask() {
        this.rootTodoTaskNodeStream$ = this.store$.pipe(select(selectTodoTaskNodesForCurrentList));
        this.rootTodoTaskNodeStream$.subscribe(value => {
            console.log('...getting updated root todo task from store...', value);
            this.rootTodoTask = value;
            this._initTreeForRendering();
        });
    }

    private _initTreeForRendering() {
        this.dataSource.data = this.rootTodoTask.children;
        this.treeControl.expandAll();
    }

    handleTaskDrop(event: CdkDragDrop<FlatTodoTaskNode>) {
        const draggedTask: FlatTodoTaskNode = this.treeControl.dataNodes[event.previousIndex];
        const dropTargetTask: FlatTodoTaskNode = this.treeControl.dataNodes[event.currentIndex];
        const direction: MoveDirection = (
            event.previousIndex - event.currentIndex < 0 ?
            MoveDirection.DOWN : MoveDirection.UP
        );

        console.log(`dragged tas ID: ${draggedTask.id}, target task ID: ${dropTargetTask.id}, direction: ${direction}`);

        console.log(`previous index: ${event.previousIndex}, new index: ${event.currentIndex}`);
        this.store$.dispatch(toTodoList.moveTaskToNewPositionAction({
            movedTaskId: draggedTask.id,
            targetTaskId: dropTargetTask.id,
            direction: direction
        }));
    }
}
