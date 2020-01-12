import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {catchError, switchMap} from 'rxjs/operators';
import * as toRoot from 'src/app/root-store/actions';
import * as toTodoList from 'src/app/task-list/store/actions';
import * as toTodoTasks from 'src/app/task-list/task-item/store/actions';
import {TodoListService} from '../../services/todo-list.service';
import {TodoTaskService} from '@src/app/services/todo-task.service';


@Injectable()
export class TaskListStoreEffects {
    constructor(private todoListService: TodoListService,
                private todoTaskService: TodoTaskService,
                private actions$: Actions) {}

    appInitialStateLoadedEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(toRoot.appInitialStateLoadedAction),
            switchMap((action: any) => this.todoListService.getTodoList(action.data.currentListId)),
            switchMap( resp => [
                toTodoList.todoListLoadedAction({todoList: resp}),
                toTodoTasks.loadRootTodoTasks({taskId: resp.rootTaskId})
            ]),
            catchError(err =>
                of(toRoot.errorAction({ msg: err.toString() }))
            )
        )
    );

    moveTaskToNewPositionEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(toTodoList.moveTaskToNewPositionAction),
            switchMap((action: any) =>
                this.todoTaskService.moveTaskToNewPosition(
                    action.movedTaskId,
                    action.targetTaskId,
                    action.direction
                )
            ),
            switchMap(resp => [
                toTodoTasks.todoTasksUpdated({ updatedTasks: resp }),
                toTodoList.taskOrderingChangeAction()
            ]),
            catchError(err =>
                of(toRoot.errorAction({ msg: err.toString() }))
            )
        )
    );
}
