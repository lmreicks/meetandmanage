import { Component } from '@angular/core';
import { CoreCacheService } from '../../app/services/core-cache.service';
import { Week, DateObject, DateFormat, WeekDays, Day } from '../models';
import * as moment from 'moment';

@Component({
    selector: 'mnm-day',
    templateUrl: 'day.component.html',
    styleUrls: ['day.component.less']
})

export class DayComponent {
    public day: Day;
    public hours: string[] = [];
    public loading: boolean = true;
    public Granularity = Granularity;
    public state: Granularity = Granularity.None;



    constructor(private coreCache: CoreCacheService) {}

    ngOnInit(): void {
        this.loading = true;
        this.setHours();
        let date = moment().format(DateFormat);
        this.coreCache.eventMap.subscribe(map => {
            let dayMoment = moment();
            let dateValue: DateObject = {
                current: dayMoment.format(DateFormat) === date,
                display: dayMoment.format('dddd, MMMM D'),
                utcDateValue: dayMoment.utc().valueOf()
            };

            this.day = {
                day: dateValue,
                events: map.has(date) ? map.get(date) : []
            };

            console.log(map);

            this.loading = false;
        });
    }

    private setHours(): void {
        this.hours.push(12 + 'am');
        for (let i = 1; i < 24; i++) {
            if (i < 12) {
                this.hours.push(i + 'am');
            } else if(i == 12) {
                this.hours.push(i + 'pm');
            } else {
                this.hours.push(i - 12 + 'pm');
            }
        }

        console.log(this.hours);
    }
}

export enum Granularity {
    None,
    Workout,
    Budget
}
