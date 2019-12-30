import {Injectable} from '@angular/core';
import {TodoListService} from '../../services/todo-list.service';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {map, mergeMap, catchError} from 'rxjs/operators';
import {RootActions} from 'src/app/root-store';
import {TodoListActions} from 'src/app/task-list/store';
import {Todolist} from '../../model/todolist';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';


@Injectable()
export class TaskListStoreEffects {
    constructor(private todoListService: TodoListService, private actions$: Actions) {}

    @Effect()
    appInitialStateLoadedEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RootActions.AppInitialStateLoadedAction),
            mergeMap(value => this._executeListRetrieval(value.data.currentListId))
        )
    );

    private _executeListRetrieval(id: number): Observable<Action> {
        return this.todoListService
            .getTodoList(id)
            .pipe(
                map(toDoList =>
                    new TodoListActions.TodoListLoadedAction({todoList: toDoList})
                ),
                catchError(err =>
                    of(RootActions.ErrorAction({ msg: err.toString() }))
                )
            );
    }
}
