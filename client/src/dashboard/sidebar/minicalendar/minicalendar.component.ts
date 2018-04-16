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

/**
 * mini monthly view that helps the user navigate their calendar 
 */
export class MiniCalendarComponent {
    public date: moment.Moment;
    public month: Month;
    public loading: boolean = true;

    constructor(private sessionService: SessionService,
                private dashboardService: DashboardService,
                private router: Router) {}

    /**
     * On init of this component, we want to get the date map and subscribe to the current date
     */
    ngOnInit(): void {

            this.dashboardService.current.subscribe(current => {
                this.loading = true;
                this.date = current;
                this.parseMonth(this.date.clone());
                this.loading = false;
            });
    }

    /**
     * parses all the dates for a given month and puts them in the proper format to be displayed
     * @param month the given month moment
     */
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
              active: dayMoment.format(DATE_FORMAT) === this.date.format(DATE_FORMAT),
              future: dayMoment.isAfter(endOfMonth),
              past: dayMoment.isBefore(startOfMonth),
              moment: dayMoment
            };

            let day = {
                day: dateValue,
                events: []
            };

            week.days.push(day);
          }
          this.month.weeks.push(week);
        }
    }

    /**
     * Displays the time in a user friendly format based on a given military time
     * @param time the given military time
     */
    friendlyTime(time: string): string {
        let date = moment(time, TIME_FORMAT);
        return date.format('hh:mm a');
    }

    clickWeekDay(click: MouseEvent, weekday: string) {
        this.router.navigate(['/dashboard/week']);
    }

    /**
     * routes the user to the create/edit event page based on a given day the user clicked
     * @param click records where the user clicks
     * @param day the given day that was clicked
     */
    doubleClickDay(click: MouseEvent, day: Day): void {
        this.dashboardService.changeDate(day.day.moment);
        this.router.navigate(['/dashboard/day']);
    }

    /**
     * changes the active day to the given day to allow the user to view its details
     * @param click records where the user clicks
     * @param day the given day that was clicked
     */
    clickDay(click: MouseEvent, day: Day): void {
        this.dashboardService.changeDate(day.day.moment);
    }
}


