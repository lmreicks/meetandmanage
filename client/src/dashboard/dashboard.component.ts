import { Component } from '@angular/core';

@Component({
    selector: 'mnm-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.less']
})

export class DashboardComponent {
    public Granularity = Granularity;
    public state: Granularity = Granularity.Month;
    constructor() {}
}

export enum Granularity {
    Day,
    Week,
    Month
}
