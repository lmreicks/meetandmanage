import { Component } from '@angular/core';
import { CoreCacheService } from '../../app/services/core-cache.service';
import { DateObject, Day } from '../models';
import {DATE_FORMAT} from '../../constants.module';
import * as moment from 'moment';
import { ApiEvent } from '../../app/models/event';
import { DashboardService } from '../dashboard.service';
import { ApiTodo } from '../../app/models/todo';

@Component({
    selector: 'mnm-day',
    templateUrl: 'day.component.html',
    styleUrls: ['day.component.less']
})

export class DayComponent {
    public current: moment.Moment;
    public map: Map<string, ApiEvent[]>;
    public day: Day;
    public hours: string[] = [];
    public eventElements: EventElement[] = [];
    public loading: boolean = true;
    public Granularity = Granularity;
    public state: Granularity = Granularity.None;

    private diff = 0;
    private height = 0;

    constructor(private coreCache: CoreCacheService,
                private dashboardService: DashboardService) {}

    ngOnInit(): void {
        this.loading = true;
        this.setHours();

        this.coreCache.GetDateMap().then(map => {
            this.map = map;
            this.dashboardService.current.subscribe(cur => {
                this.current = cur;
                this.parseDay(this.current.clone());
                this.loading = false;
            });
        });
    }

    public parseDay(curr: moment.Moment): void {
        this.eventElements = [];
        this.diff = 0;
        this.height = 0;
        let today = moment().format(DATE_FORMAT);
        let date = curr.format(DATE_FORMAT);

        let dateValue: DateObject = {
            current: curr.format(DATE_FORMAT) === today,
            display: curr.format('dddd, MMMM D'),
            utcDateValue: curr.utc().valueOf()
        };

        this.day = {
            day: dateValue,
            events: this.map.has(date) ? this.map.get(date) : []
        };

        this.day.events.forEach(event => {
            this.eventElements.push({
                top: this.getStart(event),
                height: this.getDuration(event),
                event: event
            });
        });
    }

    public getDuration(v) {
        let end = moment(v.EndDate + " " + v.EndTime);

        let start = moment(v.StartDate + " " + v.StartTime);
        if (moment.duration(end.diff(start)).asDays() >= 1) {
            end = moment(v.StartDate + " " + "24:00:00");
        }

        return this.height = moment.duration(end.clone().diff(start)).asHours() * 100;
    }

    public getStart(v) {
        let start = moment(v.StartDate + " " + v.StartTime);
        return this.diff = ((start.hours() + (start.minutes() / 60)) * 100) - this.diff - this.height;
    }

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

        console.log(this.hours);
    }
}

export interface EventElement {
    top: number;
    height: number;
    event: ApiEvent;
}

export enum Granularity {
    None,
    Workout,
    Budget
}
