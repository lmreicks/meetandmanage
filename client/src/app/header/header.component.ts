import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'mnm-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.less']
})

export class HeaderComponent {
    public month: string = moment.months[0];
    public granularity: string = 'Day';
}
