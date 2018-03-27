import { Routes } from '@angular/router';
import { AuthGuard } from "./services/auth-guard";
import { LoginComponent } from "./login/login.component";
import { EditEventComponent } from './event/edit-event/edit-event.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';


export const appRoutes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'event', children: [
        { path: ':id', component: EditEventComponent },
        { path: 'create', component: EditEventComponent }
    ]},
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: 'dashboard' }
];
