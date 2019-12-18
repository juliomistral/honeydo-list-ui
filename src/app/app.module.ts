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
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
