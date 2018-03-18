import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { appRoutes } from './app.routing';

import { httpFactory } from './services';

import { AppComponent } from './app.component';
import { CoreCacheService } from './services/core-cache.service';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth-guard';
import { AuthService } from './services/auth.service';
import { DashboardModule } from '../dashboard/dashboard.module';
import { RouterModule } from '@angular/router';
import { EditEventComponent } from './event/edit-event/edit-event.component';
import { EventService } from './event/event.service';
import { SessionService } from './services/session.service';
import { NgbDateNativeAdapter } from './shared/datepicker-adapter.component';
import { DropdownModule } from './shared/dropdown/dropdown.module';
import { ComboBoxComponent } from './shared/combo-box/combo-box.component';
import { SearchFilterPipe } from './shared/combo-box/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    EditEventComponent,
    ComboBoxComponent,
    SearchFilterPipe
  ],
  imports: [
    NgbModule.forRoot(),
    DropdownModule,
    RouterModule.forRoot(appRoutes),
    DashboardModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DlDateTimePickerDateModule,
    HttpModule
  ],
  providers: [
    CoreCacheService,
    AuthGuard,
    AuthService,
    EventService,
    SessionService,
    {
      provide: NgbDateAdapter,
      useClass: NgbDateNativeAdapter
    },
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
