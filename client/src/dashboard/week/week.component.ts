import { Component, ElementRef, ViewChild } from '@angular/core';
import { CoreCacheService } from '../../app/services/core-cache.service';
import { Week, DateObject, WeekDays } from '../models';
import { DATE_FORMAT, TIME_FORMAT } from '../../constants.module';
import * as moment from 'moment';
import { ApiEvent } from '../../app/models/event';
import { DashboardService } from '../dashboard.service';
import { Colors } from '../../app/models/colors';

@Component({
    selector: 'mnm-week',
    templateUrl: 'week.component.html',
    styleUrls: ['week.component.less', '../shared/shared.less']
})

/**
 * weekly view that contains information about events and groups.
 */
export class WeekComponent {
    @ViewChild('weekEl') weekContainerEl: ElementRef;
    public current: moment.Moment;
    public map: Map<string, ApiEvent[]>;
    public week: Week;
    public weekdays: string[] = WeekDays;
    public hours: string[] = [];
    public loading: boolean = true;

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
                current: dayMoment.format(DATE_FORMAT) === moment().format(DATE_FORMAT),
                active: dayMoment.format(DATE_FORMAT) === current,
                display: dayMoment.format('dddd D'),
                display1: dayMoment.format('MMMM Y'),
                future: dayMoment.isAfter(date.endOf('month')),
                past: dayMoment.isBefore(date.startOf('month')),
                moment: dayMoment.utc()
            };

            let day = {
                day: dateValue,
                events: [],
                todos: [],
                workouts: []
            };

            if (this.map.has(dayMoment.format(DATE_FORMAT))) {
                day.events = this.map.get(dayMoment.format(DATE_FORMAT));
                this.week.current = true;
            }

            this.week.days.push(day);
        }
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
