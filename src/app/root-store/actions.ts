import {createAction, props} from '@ngrx/store';
import {AllEntityData, AllUiData} from '@src/app/services/datatransfer';


export enum ActionTypes {
    APP_STARTUP_STARTED = '[Root] Application startup started',
    APP_INITIAL_STATE_LOADED = '[Root] App initial state loaded',
    APP_STARTUP_COMPLETED = '[Root] Application startup completed',
    ERROR_OCCURRED = '[Root] Error occurred'
}

export const AppStartupStartedAction = createAction(
  ActionTypes.APP_STARTUP_STARTED
);

export const AppInitialStateLoadedAction = createAction(
    ActionTypes.APP_INITIAL_STATE_LOADED,
    props<{data: AllUiData}>()
);

export const AppStartupCompletedAction = createAction(
    ActionTypes.APP_STARTUP_COMPLETED
);

export const ErrorAction = createAction(
    ActionTypes.ERROR_OCCURRED,
    props<{ msg: string, reasonCode?: number }>()
);

