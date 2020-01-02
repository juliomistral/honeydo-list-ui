import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {catchError, switchMap} from 'rxjs/operators';
import * as RootActions from 'src/app/root-store/actions';
import * as TodoListActions from 'src/app/task-list/store/actions';
import * as TodoItemActions from 'src/app/task-list/task-item/store/actions';
import {TodoListService} from '../../services/todo-list.service';


@Injectable()
export class TaskListStoreEffects {
    constructor(private todoListService: TodoListService, private actions$: Actions) {}

    appInitialStateLoadedEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RootActions.appInitialStateLoadedAction),
            switchMap((action: any) => this.todoListService.getTodoList(action.data.currentListId)),
            switchMap( resp => [
                TodoListActions.todoListLoadedAction({todoList: resp}),
                TodoItemActions.loadRootTodoTasks({taskId: resp.rootTaskId})
            ]),
            catchError(err =>
                of(RootActions.errorAction({ msg: err.toString() }))
            )
        )
    );
}
