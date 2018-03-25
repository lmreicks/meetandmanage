import { Routes } from '@angular/router';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { AuthGuard } from "./services/auth-guard";
import { LoginComponent } from "./login/login.component";
import { EditEventComponent } from './event/edit-event/edit-event.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';


export const appRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'event/:id', canActivate: [AuthGuard], component: EditEventComponent },
    { path: 'event/create', canActivate: [AuthGuard], component: EditEventComponent },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: 'dashboard' }
];
