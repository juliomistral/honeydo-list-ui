import { Action } from '@ngrx/store';
import { AllEntityData } from '@src/app/services/datatransfer';


export enum ActionTypes {
    APP_STARTUP_STARTED = '[Root] Application startup started',
    LOAD_APP_STATE = '[Root] Load app initial state',
    APP_STATE_LOADED = '[Root] App initial state loaded',
    APP_STARTUP_COMPLETED = '[Root] Application startup completed',
}

export class AppStartupStartedAction implements Action {
    type = ActionTypes.APP_STARTUP_STARTED;
}

export class LoadAppInitialStateAction implements Action {
    type = ActionTypes.LOAD_APP_STATE;
}

export class AppInitialStateLoadedAction implements Action {
    type = ActionTypes.APP_STATE_LOADED;
    constructor(payload: { data: AllEntityData }) {}
}

export class AppStartupCompletedAction implements Action {
    type = ActionTypes.APP_STARTUP_COMPLETED;
}

export type RootActions = AppStartupStartedAction | LoadAppInitialStateAction | AppInitialStateLoadedAction | AppStartupCompletedAction;
