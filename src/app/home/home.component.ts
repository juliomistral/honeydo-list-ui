import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as RootActions from '@src/app/root-store/actions';
import {Observable} from 'rxjs';
import {TodoListVM} from '@src/app/task-list/view-model';
import {TodoTaskNodeVM} from '@src/app/task-list/task-item/view-model';
import {selectCurrentTodoList} from '@src/app/task-list/store/selectors';
import {selectTodoTaskNodesForCurrentList} from '@src/app/task-list/task-item/store/selectors';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentList$: Observable<TodoListVM>;
  rootTodoTask$: Observable<TodoTaskNodeVM>;

  constructor(private store$: Store<{}>) {
    this.currentList$ = this.store$.pipe(select(selectCurrentTodoList));
    this.rootTodoTask$ = this.store$.pipe(select(selectTodoTaskNodesForCurrentList));
  }

  ngOnInit() {
    this.store$.dispatch(RootActions.appStartupStartedAction());
  }
}
