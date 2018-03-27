import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
    selector: 'mnm-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.less']
})

export class DashboardComponent {
    public current: moment.Moment;

    constructor(private router: Router) {}

    public updateDate(date: moment.Moment) {
        this.current = date;
    }
}
