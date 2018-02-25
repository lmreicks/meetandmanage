import { Routes } from '@angular/router';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { AuthGuard } from "./services/auth-guard";
import { LoginComponent } from "./login/login.component";
import { EditEventComponent } from './event/edit-event/edit-event.component';


export const appRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'event', canActivate: [AuthGuard], children: [
        { path: '', pathMatch: 'full', redirectTo: 'create' },
        { path: 'edit', component: EditEventComponent, data: [] }
    ]}
];
