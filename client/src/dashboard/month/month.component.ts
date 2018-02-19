import { Component } from '@angular/core';
import { days } from '../week/week.model';
import * as moment from 'moment';

@Component({
    selector: 'mnm-month',
    templateUrl: 'month.component.html',
    styleUrls: ['month.component.less']
})

export class MonthComponent {
    days: string[] = days;
    weeks: number[] = [0, 1, 2, 3];
    month: Week[];

    constructor() {
        console.log(moment().daysInMonth());
    }

    ngOnInit(): void {
    }
}

export interface Week {
    days: number[];
}

