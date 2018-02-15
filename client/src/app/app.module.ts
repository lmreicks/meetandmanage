import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { httpFactory } from './services';

import { AppComponent } from './app.component';
import { MiniCalendarComponent } from './dashboard/mini-calendar/mini-calendar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoreCacheService } from './services/core-cache.service';
import { HeaderComponent } from './header/header.component';
import { EventComponent} from './dashboard/event/event.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MiniCalendarComponent,
    DashboardComponent,
    EventComponent,
    LoginComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    CoreCacheService,
    LoginService,
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
