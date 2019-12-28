import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListStoreModule } from '@src/app/task-list/store/task-list-store.module';
import { TaskItemStoreModule } from '@src/app/task-list/task-item/store/task-item.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TaskListStoreModule,
    TaskItemStoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ]
})
export class RootStoreModule { }
