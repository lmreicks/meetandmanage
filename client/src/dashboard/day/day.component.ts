import { Component } from '@angular/core';
import { CoreCacheService } from '../../app/services/core-cache.service';
import { Week, DateObject, WeekDays, Day } from '../models';
import {DATE_FORMAT} from '../../constants.module';
import * as moment from 'moment';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { ApiEvent } from '../../app/models/event';

@Component({
    selector: 'mnm-day',
    templateUrl: 'day.component.html',
    styleUrls: ['day.component.less']
})

export class DayComponent {
    public day: Day;
    public hours: string[] = [];
    public eventElements: EventElement[] = [];
    public loading: boolean = true;
    public Granularity = Granularity;
    public state: Granularity = Granularity.None;
    private diff = 0;
    private height = 0;



    constructor(private coreCache: CoreCacheService) {}

    ngOnInit(): void {
        this.loading = true;
        this.setHours();
        let date = moment().format(DATE_FORMAT);
        this.coreCache.GetDateMap().then(map => {
            let dayMoment = moment();
            let dateValue: DateObject = {
                current: dayMoment.format(DATE_FORMAT) === date,
                display: dayMoment.format('dddd, MMMM D'),
                utcDateValue: dayMoment.utc().valueOf()
            };

            this.day = {
                day: dateValue,
                events: map.has(date) ? map.get(date) : []
            };

            this.day.events.forEach(event => {
                this.eventElements.push({
                    top: this.getStart(event),
                    height: this.getDuration(event),
                    event: event
                });
            });

            console.log(map);

            this.loading = false;
        });
    }



    public getDuration(v) {
        var end = moment(v.EndDate + " " + v.EndTime);
        
        var start = moment(v.StartDate + " " + v.StartTime);
        if(moment.duration(end.diff(start)).asDays()>=1){
            end = moment(v.StartDate + " " + "24:00:00")
        }
        
        return this.height = moment.duration(end.clone().diff(start)).asHours() * 100;
    }

    public getStart(v) {
        var start = moment(v.StartDate + " " + v.StartTime);
        return this.diff = ((start.hours() + (start.minutes()/60)) * 100) - this.diff - this.height;
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

export interface EventElement {
    top: number,
    height: number,
    event: ApiEvent;
}

export enum Granularity {
    None,
    Workout,
    Budget
}
