import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, RoutesRecognized } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RxjsTutorialModule } from './rxjs-tutorial/rxjs-tutorial.module';

import { RxjsTutorialComponent } from './rxjs-tutorial/partial/rxjs-tutorial/rxjs-tutorial.component';
import { MediatorComponent } from './rxjs-tutorial/partial/rxjs-tutorial/mediator/mediator.component';

const Routes: Routes = [{ path: '***', component: RxjsTutorialComponent }, { path: '', component: MediatorComponent }];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RxjsTutorialModule,
    RouterModule.forRoot(Routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
