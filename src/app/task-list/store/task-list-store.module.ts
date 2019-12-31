import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import {TaskListStoreEffects} from '@src/app/task-list/store/effects';
import {todoListReducerKey, reducer} from '@src/app/task-list/store/reducers';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(todoListReducerKey, reducer),
    EffectsModule.forFeature([TaskListStoreEffects])
  ]
})
export class TaskListStoreModule { }
