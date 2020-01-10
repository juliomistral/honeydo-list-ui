import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as RootActions from '@src/app/root-store/actions';
import {Observable} from 'rxjs';
import {TodoTaskNodeVM} from '@src/app/task-list/task-item/view-model';
import {selectCurrentTodoList, selectCurrentTodoListRootTaskId} from '@src/app/task-list/store/selectors';
import {selectTodoTaskNodesForCurrentList} from '@src/app/task-list/task-item/store/selectors';
import {Todolist} from '../model/todolist';
import {selectCurrentListId} from '@src/app/root-store/selectors';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnChanges {
  currentListId$: Observable<number>;
  rootTodoTaskId$: Observable<number>;

  constructor(private store$: Store<{}>) {
  }

  ngOnInit() {
    this.currentListId$ = this.store$.pipe(select(selectCurrentListId));
    this.rootTodoTaskId$ = this.store$.pipe(select(selectCurrentTodoListRootTaskId));

    this.store$.dispatch(RootActions.appStartupStartedAction());
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Home onChange fired', changes);
  }
}
