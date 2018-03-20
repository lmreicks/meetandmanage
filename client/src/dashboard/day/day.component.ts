import { Component } from '@angular/core';
import { CoreCacheService } from '../../app/services/core-cache.service';
import { Week, DateObject, WeekDays, Day } from '../models';
import {DATE_FORMAT} from '../../constants.module';
import * as moment from 'moment';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

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
    private diff = 0;
    private height = 0;



    constructor(private coreCache: CoreCacheService) {}

    ngOnInit(): void {
        this.loading = true;
        this.setHours();
        let date = moment().format(DATE_FORMAT);
        this.coreCache.eventMap.subscribe(map => {
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
        console.log(moment.duration(end.diff(start)).asHours() * 120);
        
        return this.height = moment.duration(end.diff(start)).asHours() * 120;
    }

    public getStart(v) {
        var start = moment(v.StartDate + " " + v.StartTime);
        console.log((start.hours() + (start.minutes()/60)) * 120);
        return this.diff = ((start.hours() + (start.minutes()/60)) * 120) - this.diff;
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
