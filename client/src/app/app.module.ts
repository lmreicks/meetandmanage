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
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AgmCoreModule } from '@agm/core';
import { UserService } from './user/user.service';
import { LocationInput } from './shared/location-input/location-input.component';
import { GroupService } from './group/group.service';
import { EditGroupComponent } from './group/edit-group/edit-group.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    EditEventComponent,
    ComboBoxComponent,
    SearchFilterPipe,
    NotFoundComponent,
    LocationInput,
    EditGroupComponent
  ],
  imports: [
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDUJitlzdDW3SpdwzBzDW5YnTS_I-HeMCs",
      libraries: ["places"]
    }),
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
    UserService,
    GroupService,
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
