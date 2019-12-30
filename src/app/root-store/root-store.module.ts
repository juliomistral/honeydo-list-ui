import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TaskListStoreModule } from '@src/app/task-list/store/task-list-store.module';
import { TaskItemStoreModule } from '@src/app/task-list/task-item/store/task-item.module';
import {rootReducerKey, reducer} from '@src/app/root-store/reducers';
import {RootStoreEffects} from '@src/app/root-store/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TaskListStoreModule,
    TaskItemStoreModule,
    StoreModule.forFeature(rootReducerKey, reducer),
    EffectsModule.forFeature([RootStoreEffects])
  ]
})
export class RootStoreModule { }
