import { Routes } from '@angular/router';
import { AuthGuard } from "./services/auth-guard";
import { LoginComponent } from "./login/login.component";
import { EditEventComponent } from './event/edit-event/edit-event.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { CreateGroupComponent } from './group/create-group/create-group.component';
import { GroupComponent } from './group/group/group.component';
import { GroupsComponent } from './group/groups.component';


export const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'event', children: [
        { path: ':id', component: EditEventComponent },
        { path: 'create', component: EditEventComponent }
    ]},
    { path: 'group', children: [
        { path: '', component: GroupsComponent },
        { path: ':id', component: GroupComponent },
        { path: 'create', component: CreateGroupComponent }
    ]},
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: 'dashboard' }
];
