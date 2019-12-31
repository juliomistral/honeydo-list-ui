import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {appInitialStateLoadedAction, appStartupStartedAction, errorAction} from './actions';
import {LocalStorageService} from '../services/local-storage.service';


@Injectable()
export class RootStoreEffects {
    constructor(private localStorageService: LocalStorageService, private actions$: Actions) {}

    appStartupStartedEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(appStartupStartedAction),
            switchMap((action: any) => {
                console.log('Retrieving app state from local storage...');
                return this.localStorageService.loadAppStateFromLocal();
            }),
            switchMap(allUiData => [
                appInitialStateLoadedAction({data: allUiData})
            ]),
            catchError(err =>
                of(errorAction({ msg: err.toString() }))
            )
        )
    );
}
