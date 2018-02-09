import { Component } from '@angular/core';
import { CoreCacheService } from '../services';

@Component({
    selector: 'mnm-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.less']
})

export class DashboardComponent {
    constructor(private coreCache: CoreCacheService) {}
}
