import { Component } from '@angular/core';
import { CoreCacheService } from '../../app/services/core-cache.service';
import { Week, DateObject, WeekDays } from '../models';
import { DATE_FORMAT, TIME_FORMAT } from '../../constants.module';
import * as moment from 'moment';
import { ApiEvent } from '../../app/models/event';
import { DashboardService } from '../dashboard.service';

@Component({
    selector: 'mnm-week',
    templateUrl: 'week.component.html',
    styleUrls: ['week.component.less']
})

/**
 * weekly view that contains information about events and groups.
 */
export class WeekComponent {
    public current: moment.Moment;
    public map: Map<string, ApiEvent[]>;
    public week: Week;
    public weekdays: string[] = WeekDays;
    public hours: string[] = [];
    public loading: boolean = true;
    private diff = 0;
    private height = 0;

    constructor(private coreCache: CoreCacheService,
                private dashboardService: DashboardService) {}

    /**
     * On init of this component, we want to get the date map and subscribe to the current date
     */
    ngOnInit(): void {
        this.loading = true;
        this.setHours();
        this.coreCache.GetDateMap().then(map => {
            this.map = map;
            this.dashboardService.current.subscribe(cur => {
                this.current = cur;
                this.parseWeek(this.current.clone());
                this.loading = false;
            });
        });
    }

    /**
     * parses all the events and dates for a week based off a given day and puts them in the proper format to be displayed
     * @param date the given day moment
     */
    private parseWeek(date: moment.Moment): void {
        this.week = {
            current: false,
            days: []
        };

        let current = date.format(DATE_FORMAT);
        let startOfWeek = date.startOf('week');
        let startDate = moment.utc(startOfWeek);

        for (let i = 0; i < 7; i++) {
            let dayMoment = startDate.clone().add(i, 'days');

            let dateValue: DateObject = {
                current: dayMoment.format(DATE_FORMAT) === current,
                display: dayMoment.format('dddd D'),
                display1: dayMoment.format('MMMM Y'),
                future: dayMoment.isAfter(date.endOf('month')),
                past: dayMoment.isBefore(date.startOf('month')),
                moment: dayMoment.utc()
            };

            let day = {
                day: dateValue,
                events: []
            };

            if (this.map.has(dayMoment.format(DATE_FORMAT))) {
                day.events = this.map.get(dayMoment.format(DATE_FORMAT));
                this.week.current = true;
            }

            this.week.days.push(day);
        }
    }

    /**
     * calculates the duration of a given event and puts it in terms of pixels in order to display it.
     * @param v the given event
     */
    public getDuration(v) {
        let end = moment(v.EndDate + " " + v.EndTime);

        let start = moment(v.StartDate + " " + v.StartTime);
        if (moment.duration(end.diff(start)).asDays() >= 1) {
            end = moment(v.StartDate + " " + "24:00:00");
        }

        return this.height = moment.duration(end.diff(start)).asHours() * 100;
    }

    /**
     * calculates the amount of time between the start of the day and the start of a given event and puts it in terms of pixels in order to display it.
     * @param v the given event
     */
    public getStart(v) {
        let start = moment(v.StartDate + " " + v.StartTime);
        return this.diff = ((start.hours() + (start.minutes() / 60)) * 100) - this.diff - this.height;
    }

    /**
     * resets global variables diff and height.
     */
    public resetVars() {
        this.diff = 0;
        this.height = 0;
    }

    /**
     * creates an array containing the ours in a day in order to display them.
     */
    private setHours(): void {
        this.hours.push(12 + 'am');
        for (let i = 1; i < 24; i++) {
            if (i < 12) {
                this.hours.push(i + 'am');
            } else if (i === 12) {
                this.hours.push(i + 'pm');
            } else {
                this.hours.push(i - 12 + 'pm');
            }
        }
    }
}
