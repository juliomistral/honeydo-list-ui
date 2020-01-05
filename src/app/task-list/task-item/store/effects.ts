import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, switchMap} from 'rxjs/operators';
import {errorAction} from '@src/app/root-store/actions';
import {TodoTaskService} from '@src/app/services/todo-task.service';
import * as TodoItemActions from '@src/app/task-list/task-item/store/actions';
import {TodoTask} from '../../../model/todolist';


@Injectable()
export class TodoItemStoreEffects {
    constructor(private taskItemService: TodoTaskService, private actions$: Actions) {}

    loadTodoTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TodoItemActions.loadRootTodoTasks),
            switchMap((action: any) => {
                return this.taskItemService.getTasksForRootTaskId(action.taskId);
            }),
            switchMap(todoTasks => [
                TodoItemActions.rootTodoTasksLoaded({ tasks: todoTasks })
            ]),
            catchError(err =>
                of(errorAction({ msg: err.toString() }))
            )
        )
    );
}
