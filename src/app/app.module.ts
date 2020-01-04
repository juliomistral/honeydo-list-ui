import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import { TaskListComponent } from '@src/app/task-list/task-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTreeModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskItemComponent } from '@src/app/task-list/task-item/task-item.component';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { RootStoreModule} from '@src/app/root-store/root-store.module';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        TaskListComponent,
        TaskItemComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatTreeModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        DragDropModule,
        RootStoreModule,
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode,
            name: 'Honeydo List Ngrx Store Dev'
        }),
    ],
    providers: [],
    exports: [
        TaskListComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
