import { Routes } from "@angular/router";
import { WeekComponent } from "./week/week.component";
import { MonthComponent } from "./month/month.component";
import { AuthGuard } from "../app/services/auth-guard";
import { DashboardComponent } from "./dashboard.component";

export const dashboardRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'month' },
            { path: 'month', component: MonthComponent },
            { path: 'month/:year/:month/:day', component: MonthComponent },
            { path: 'week', component: WeekComponent },
            { path: 'week/:year/:month/:day', component: WeekComponent },
            { path: 'day', redirectTo: '/month' },
        ]
    }
];
