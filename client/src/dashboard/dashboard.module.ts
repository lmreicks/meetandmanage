import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { httpFactory } from '../app/services/interceptor';

import { DashboardComponent } from './dashboard.component';
import { MonthComponent } from './month/month.component';
import { WeekComponent } from './week/week.component';
import { EventPopoverComponent } from './event-popover/event-popover.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { DASHBOARD_ROUTES } from './dashboard.routing';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MiniCalendarComponent } from './sidebar/minicalendar/minicalendar.component';
import { DashboardService } from './dashboard.service';
import { DayComponent } from './day/day.component';
import { CollapseModule, BsDatepickerModule } from 'ngx-bootstrap';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoListService } from './todo-list/todo-list.service';
import { ScrollToDirective } from './shared/scroll-to.directive';
import { EventListComponent } from './event-list/event-list.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    MiniCalendarComponent,
    HeaderComponent,
    MonthComponent,
    DayComponent,
    WeekComponent,
    EventPopoverComponent,
    TodoListComponent,
    ScrollToDirective,
    EventListComponent
  ],
  imports: [
    RouterModule.forChild(DASHBOARD_ROUTES),
    NgbModule.forRoot(),
    CollapseModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  exports: [
      DashboardComponent,
      HeaderComponent,
      EventListComponent
  ],
  providers: [
    DashboardService,
    TodoListService,
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    }],
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }
