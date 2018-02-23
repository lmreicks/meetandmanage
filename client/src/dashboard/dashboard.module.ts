import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { httpFactory } from '../app/services';

import { DashboardComponent } from './dashboard.component';
import { MonthComponent } from './month/month.component';
import { WeekComponent } from './week/week.component';
import { EventPopoverComponent } from './event-popover/event-popover.component';
import { DayComponent } from './day/day.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MonthComponent,
    DayComponent,
    WeekComponent,
    EventPopoverComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  exports: [
      DashboardComponent
  ],
  providers: [
    JwtHelper,
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    }],
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }
