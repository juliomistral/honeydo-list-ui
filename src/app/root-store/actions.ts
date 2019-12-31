import {createAction, props} from '@ngrx/store';
import {AllUiData} from '@src/app/services/datatransfer';


export enum ActionTypes {
    APP_STARTUP_STARTED = '[Root] Application startup started',
    APP_INITIAL_STATE_LOADED = '[Root] App initial state loaded',
    APP_STARTUP_COMPLETED = '[Root] Application startup completed',
    ERROR_OCCURRED = '[Root] Error occurred'
}

export const appStartupStartedAction = createAction(
  ActionTypes.APP_STARTUP_STARTED
);

export const appInitialStateLoadedAction = createAction(
    ActionTypes.APP_INITIAL_STATE_LOADED,
    props<{data: AllUiData}>()
);

export const appStartupCompletedAction = createAction(
    ActionTypes.APP_STARTUP_COMPLETED
);

export const errorAction = createAction(
    ActionTypes.ERROR_OCCURRED,
    props<{ msg: string, reasonCode?: number }>()
);

