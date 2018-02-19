import { Component } from '@angular/core';

@Component({
    selector: 'mnm-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.less']
})

export class DashboardComponent {
    constructor() {
        console.log("Dashboard module");
    }
}
