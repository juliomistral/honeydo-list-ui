import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {todoTaskReducerKey} from 'src/app/task-list/task-item/store/reducers';
import {TodoItemStoreEffects} from 'src/app/task-list/task-item/store/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([TodoItemStoreEffects])
  ]
})
export class TaskItemStoreModule { }
