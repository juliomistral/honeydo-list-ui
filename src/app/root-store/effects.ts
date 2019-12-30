import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Action} from '@ngrx/store';
import {AppInitialStateLoadedAction, AppStartupStartedAction, ErrorAction} from './actions';
import {LocalStorageService} from '../services/local-storage.service';


@Injectable()
export class RootStoreEffects {
    constructor(private localStorageService: LocalStorageService, private actions$: Actions) {}

    @Effect()
    appStartupStartedEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppStartupStartedAction),
            mergeMap(() => this._executeLoadAppState())
        )
    );

    private _executeLoadAppState(): Observable<Action> {
        return this.localStorageService
            .loadAppStateFromLocal()
            .pipe(
                map(allUiData =>
                    AppInitialStateLoadedAction({ data: allUiData })),
                catchError(err =>
                    of(ErrorAction({ msg: err.toString() }))
                )
            );
    }
}
