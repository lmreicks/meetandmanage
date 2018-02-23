import { Component } from '@angular/core';
import { CoreCacheService } from '../../app/services/core-cache.service';
import { Week, DateObject, DateFormat, WeekDays } from '../models';
import * as moment from 'moment';

@Component({
    selector: 'mnm-week',
    templateUrl: 'week.component.html',
    styleUrls: ['week.component.less']
})

export class WeekComponent {
    public week: Week;
    public weekdays: string[] = WeekDays;
    public hours: string[] = [];
    public loading: boolean = true;

    constructor(private coreCache: CoreCacheService) {}

    ngOnInit(): void {
        this.loading = true;
        this.setHours();
        this.coreCache.eventMap.subscribe(map => {
            this.week = {
                current: false,
                days: []
            };

            let today = moment();
            let current = today.format(DateFormat)
            let startOfWeek = today.startOf('week');
            let startDate = moment.utc(startOfWeek);

            for (let i = 0; i < 7; i++) {
                let dayMoment = startDate.clone().add(i, 'days');

                let dateValue: DateObject = {
                    current: dayMoment.format(DateFormat) === current,
                    display: dayMoment.format('dddd D'),
                    future: dayMoment.isAfter(today.endOf('month')),
                    past: dayMoment.isBefore(today.startOf('month')),
                    utcDateValue: dayMoment.utc().valueOf()
                };

                let day = {
                    day: dateValue,
                    events: []
                };

                if (map.has(dayMoment.format(DateFormat))) {
                    day.events = map.get(dayMoment.format(DateFormat));
                    this.week.current = true;
                }

                this.week.days.push(day);
            }

            this.loading = false;
        });
    }

    private setHours(): void {
        for (let i = 1; i < 24; i++) {
            if (i <= 12) {
                this.hours.push(i + 'am');
            } else {
                this.hours.push(i - 12 + 'pm');
            }
        }
    }
}
