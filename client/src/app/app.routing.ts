import { Routes } from '@angular/router';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { AuthGuard } from "./services/auth-guard";
import { LoginComponent } from "./login/login.component";


export const appRoutes: Routes = [
    // list of top most popular movies
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    },
    {
      path: 'dashboard',
      component: DashboardComponent
    },
    {
      path: 'login',
      component: LoginComponent
    }
];
