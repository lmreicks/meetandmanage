import { Routes } from "@angular/router";
import { WeekComponent } from "./week/week.component";
import { MonthComponent } from "./month/month.component";
import { DashboardComponent } from "./dashboard.component";
import { DayComponent } from "./day/day.component";

export const DASHBOARD_ROUTES: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'month' },
            { path: 'month', component: MonthComponent },
            { path: 'month/:year/:month/:day', component: MonthComponent },
            { path: 'week', component: WeekComponent },
            { path: 'week/:year/:month/:day', component: WeekComponent },
            { path: 'day', component: DayComponent },
        ]
    }
];
