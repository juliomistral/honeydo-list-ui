import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, switchMap} from 'rxjs/operators';
import {errorAction} from '@src/app/root-store/actions';
import {TodoTaskService} from '@src/app/services/todo-task.service';
import * as toTodoItems from '@src/app/task-list/task-item/store/actions';
import {TaskStatus} from '../../../model/todolist';


@Injectable()
export class TodoItemStoreEffects {
    constructor(private taskItemService: TodoTaskService, private actions$: Actions) {}

    loadTodoTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(toTodoItems.loadRootTodoTasks),
            switchMap((action: any) => {
                return this.taskItemService.getTasksForRootTaskId(action.taskId);
            }),
            switchMap(todoTasks => [
                toTodoItems.rootTodoTasksLoaded({ tasks: todoTasks })
            ]),
            catchError(err =>
                of(errorAction({ msg: err.toString() }))
            )
        )
    );

    updateTodoTaskProperties$ = createEffect(() =>
        this.actions$.pipe(
            ofType(toTodoItems.updateTodoTaskProperties),
            switchMap((action: any) => {
                return this.taskItemService.updateTodoTask(action.updatedTask);
            }),
            switchMap(updateResponse => [
                toTodoItems.todoTasksUpdated({ updatedTasks: [updateResponse] })
            ]),
            catchError(err =>
                of(errorAction({ msg: err.toString() }))
            )
        )
    );

    updateTodoTaskStatus$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                toTodoItems.markTaskAsStartedAction,
                toTodoItems.markTaskAsCompletedAction
            ),
            switchMap((action: any) => {
                let newStatus: TaskStatus;
                switch (action.type) {
                    case toTodoItems.ActionTypes.MARK_TODO_TASK_STARTED: {
                        newStatus = TaskStatus.IN_PROGRESS;
                        break;
                    }
                    case toTodoItems.ActionTypes.MARK_TODO_TASK_COMPLETED: {
                        newStatus = TaskStatus.COMPLETED;
                        break;
                    }
                }
                console.log(`Updating task status [${action.taskId}]:  ${newStatus}`);
                return this.taskItemService.updateTodoTaskStatus(action.taskId, newStatus);
            }),
            switchMap(updateResponse => [
                toTodoItems.todoTasksUpdated({ updatedTasks: [updateResponse] })
            ]),
            catchError(err =>
                of(errorAction({ msg: err.toString() }))
            )
        )
    );


}
