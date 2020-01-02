import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import * as fromRoot from '@src/app/root-store/reducers';
import { TaskListStoreModule } from '@src/app/task-list/store/task-list-store.module';
import { TaskItemStoreModule } from '@src/app/task-list/task-item/store/task-item.module';
import {RootStoreEffects} from '@src/app/root-store/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TaskListStoreModule,
    TaskItemStoreModule,
    StoreModule.forRoot({ appState:  fromRoot.reducers }),
    EffectsModule.forRoot([RootStoreEffects])
  ]
})
export class RootStoreModule { }
