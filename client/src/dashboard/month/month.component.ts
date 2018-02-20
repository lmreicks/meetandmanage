import { Component } from '@angular/core';
import * as moment from 'moment';
import { ApiEvent } from '../../app/models/event';
import { CoreCacheService } from '../../app/services';
import { DateObject, DateFormat } from '../models/date.model';
import { Month, Months } from '../models/month.model';
import { Week, WeekDays } from '../models/week.model';

@Component({
    selector: 'mnm-month',
    templateUrl: 'month.component.html',
    styleUrls: ['month.component.less']
})

export class MonthComponent {
    public month: Month;
    public loading: boolean = true;
    public currentMonth: number = moment().month();

    constructor(private coreCache: CoreCacheService) {}

    ngOnInit(): void {
        this.loading = true;
        this.coreCache.payload.subscribe(map => {
            let startOfMonth = moment.utc().startOf('month');
            let endOfMonth = moment.utc().endOf('month');

            let startDate = moment.utc(startOfMonth).subtract(Math.abs(startOfMonth.weekday()), 'days');

            let currentFormat = moment().format(DateFormat);

            this.month = {
                name: Months[this.currentMonth],
                weeks: [],
                weekdays: WeekDays
            };

            for (let i = 0; i < 5; i++) {
              let week: Week = {
                  days: [],
                  current: false
              };
              for (let j = 0; j < 7; j++) {
                let dayMoment = moment.utc(startDate).add((i * 7) + j, 'days');

                let dateValue: DateObject = {
                  current: dayMoment.format(DateFormat) === currentFormat,
                  display: dayMoment.format('D'),
                  future: dayMoment.isAfter(endOfMonth),
                  past: dayMoment.isBefore(startOfMonth),
                  utcDateValue: dayMoment.valueOf()
                };

                let day = {
                    day: dateValue,
                    events: []
                };

                if (map.has(dayMoment.format(DateFormat))) {
                    day.events = map.get(dayMoment.format(DateFormat));
                    week.current = true;
                }

                week.days.push(day);
              }
              this.month.weeks.push(week);
            }
            this.loading = false;
        });
    }

    friendlyTime(time: string): string {
        let date = new Date(time);
        return date.toTimeString();
    }
}


