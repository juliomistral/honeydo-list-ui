import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {TodoTaskService} from '@src/app/services/todo-task.service';
import * as TodoItemActions from '@src/app/task-list/task-item/store/actions';
import {catchError, switchMap} from 'rxjs/operators';
import {errorAction} from '@src/app/root-store/actions';
import {LocalStorageService} from '@src/app/services/local-storage.service';
import {of} from 'rxjs';
import {TodoTask} from '@src/app/model/todolist';


@Injectable()
export class TodoItemStoreEffects {
    constructor(private taskItemService: TodoTaskService, private actions$: Actions) {}

    loadTodoTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TodoItemActions.loadTodoTask),
            switchMap((action: any) => {
                return this.taskItemService.getTasksForRootTaskId(action.taskId);
            }),
            switchMap(todoTask => [
                TodoItemActions.todoTasksLoaded({task: todoTask})
            ]),
            catchError(err =>
                of(errorAction({ msg: err.toString() }))
            )
        )
    );
}
