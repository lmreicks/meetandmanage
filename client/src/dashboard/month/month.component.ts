import { Component } from '@angular/core';
import { days } from '../week/week.model';
import * as moment from 'moment';
import { ApiEvent } from '../../app/models/event';
import { CoreCacheService } from '../../app/services';

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
            let selectedDate = moment.utc(moment());
            let startOfMonth = moment.utc(selectedDate).startOf('month');
            let endOfMonth = moment.utc(selectedDate).endOf('month');

            let startDate = moment.utc(startOfMonth).subtract(Math.abs(startOfMonth.weekday()), 'days');

            let dayFormat = 'YYYY-MMM-DD';

            let currentFormat = moment().format(dayFormat);

            this.month = {
                key: this.currentMonth,
                weeks: [],
                weekdays: []
            };

            for (let dayNumber = 0; dayNumber < 7; dayNumber += 1) {
              this.month.weekdays.push(moment.utc().weekday(dayNumber).format('dddd'));
            }

            for (let i = 0; i < 5; i++) {
              let week: Week = {
                  days: [],
                  current: false
              };
              for (let j = 0; j < 7; j++) {
                let dayMoment = moment.utc(startDate).add((i * 7) + j, 'days');

                let dateValue: DateObject = {
                  current: dayMoment.format(dayFormat) === currentFormat,
                  display: dayMoment.format('D'),
                  future: dayMoment.isAfter(endOfMonth),
                  past: dayMoment.isBefore(startOfMonth),
                  utcDateValue: dayMoment.valueOf()
                };

                let day = {
                    day: dateValue,
                    events: []
                };
                if (map.get(moment().year()).months.has(this.currentMonth)) {
                    let dayMap = map.get(moment().year()).months.get(this.currentMonth);
                    if (dayMap.days.has(dayMoment.day())) {
                        day = dayMap.days.get(dayMoment.day());
                    }
                }

                week.days.push(day);
              }
              this.month.weeks.push(week);
            }
            this.loading = false;
        });
    }
}

export interface Month {
    key: number;
    weeks: Week[];
    weekdays: string[];
}

export interface Week {
    days: Day[];
    current: boolean;
}

export interface Day {
    day: DateObject;
    events: ApiEvent[];
}


export interface DateObject {
    utcDateValue: number;
    current?: boolean;
    display?: string;
    future?: boolean;
    past?: boolean;
}
