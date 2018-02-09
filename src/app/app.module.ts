import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastyModule } from 'ng2-toasty';

import { AppComponent, } from './app.component';
import { environment } from '../environments/environment';

import { HttpModule } from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemTodoService } from '../server/InMemTodoService';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImportMaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers } from './reducers';
import { TaskEffects } from './effects/task.effects';

import { TaskService } from './services/task.service';
import { TodoComponent } from './components/todo/todo.component';
import { HeaderComponent } from './components/header/header.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ToasterComponent } from './components/toaster/toaster.component';

import { MatCheckboxModule, MatInputModule } from '@angular/material';
import { ServerTimeService } from './services/serverTime.service';


@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    HeaderComponent,
    DialogComponent,
    ToasterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ImportMaterialModule,
    HttpModule,
    FormsModule,
    InMemoryWebApiModule.forRoot(InMemTodoService, { delay: 500 }),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([TaskEffects]),
    ToastyModule.forRoot(),
    MatCheckboxModule,
    MatInputModule
  ],
  providers: [
    TaskService,
    ServerTimeService
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent],
})
export class AppModule { }
