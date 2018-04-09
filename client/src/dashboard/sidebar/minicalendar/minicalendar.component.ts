import { Component, Input, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { DateObject } from '../../models/date.model';
import { DATE_FORMAT, TIME_FORMAT } from '../../../constants.module';
import { Month, Months } from '../../models/month.model';
import { Week, WeekDays } from '../../models/week.model';
import { Day } from '../../models';
import { SessionService } from '../../../app/services/session.service';
import { EventService } from '../../../app/event/event.service';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { DashboardService } from '../../dashboard.service';

@Component({
    selector: 'mnm-minicalendar',
    templateUrl: 'minicalendar.component.html',
    styleUrls: ['minicalendar.component.less']
})

export class MiniCalendarComponent {
    public date: moment.Moment;
    public month: Month;
    public loading: boolean = true;

    constructor(private sessionService: SessionService,
                private dashboardService: DashboardService,
                private router: Router) {}

    ngOnInit(): void {
        this.loading = true;

            this.dashboardService.current.subscribe(current => {
                this.date = current;
                this.parseMonth(this.date.clone());
                this.loading = false;
            });
    }

    parseMonth(month: moment.Moment): void {
        let startOfMonth = moment.utc(month).startOf('month');
        let endOfMonth = moment.utc(month).endOf('month');

        let startDate = moment.utc(startOfMonth).subtract(Math.abs(startOfMonth.weekday()), 'days');

        let currentFormat = moment().format(DATE_FORMAT);

        this.month = {
            name: Months[this.date.month()],
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
              current: dayMoment.format(DATE_FORMAT) === currentFormat,
              display: dayMoment.format('D'),
              future: dayMoment.isAfter(endOfMonth),
              past: dayMoment.isBefore(startOfMonth),
              utcDateValue: dayMoment.valueOf()
            };

            let day = {
                day: dateValue,
                events: []
            };

            week.current = true;

            week.days.push(day);
          }
          this.month.weeks.push(week);
        }
    }

    friendlyTime(time: string): string {
        let date = moment(time, TIME_FORMAT);
        return date.format('hh:mm a');
    }

    DoubleClickDay(click: MouseEvent, day: Day): void {
        this.router.navigate(['event/create']);
    }

    clickDay(click: MouseEvent, day: Day): void {
        console.log(moment().date(+day.day.display))
    }
}


