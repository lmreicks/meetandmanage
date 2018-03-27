import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { httpFactory } from '../app/services';

import { DashboardComponent } from './dashboard.component';
import { MonthComponent } from './month/month.component';
import { WeekComponent } from './week/week.component';
import { EventPopoverComponent } from './event-popover/event-popover.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { dashboardRoutes } from './dashboard.routing';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardService } from './dashboard.service';
import { DayComponent } from './day/day.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    MonthComponent,
    DayComponent,
    WeekComponent,
    EventPopoverComponent
  ],
  imports: [
    RouterModule.forChild(dashboardRoutes),
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
    DashboardService,
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    }],
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }
