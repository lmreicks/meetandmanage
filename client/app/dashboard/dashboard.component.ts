import { Component } from '@angular/core';
import { CoreCacheService } from '../services';
import * as moment from 'moment';

@Component({
    selector: 'mnm-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.less']
})

export class DashboardComponent {
    public month: string = moment.months[0];
    constructor(private coreCache: CoreCacheService) {}
}
