import { Component } from '@angular/core';
import { CoreCacheService } from '../../app/services/core-cache.service';
import { Week, DateObject, WeekDays } from '../models';
import { DATE_FORMAT, TIME_FORMAT } from '../../constants.module';
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
    private diff = 0;
    private height = 0;

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
            let current = today.format(DATE_FORMAT);
            let startOfWeek = today.startOf('week');
            let startDate = moment.utc(startOfWeek);

            for (let i = 0; i < 7; i++) {
                let dayMoment = startDate.clone().add(i, 'days');

                let dateValue: DateObject = {
                    current: dayMoment.format(DATE_FORMAT) === current,
                    display: dayMoment.format('dddd D'),
                    display1: dayMoment.format('MMMM Y'),
                    future: dayMoment.isAfter(today.endOf('month')),
                    past: dayMoment.isBefore(today.startOf('month')),
                    utcDateValue: dayMoment.utc().valueOf()
                };

                let day = {
                    day: dateValue,
                    events: []
                };

                if (map.has(dayMoment.format(DATE_FORMAT))) {
                    day.events = map.get(dayMoment.format(DATE_FORMAT));
                    this.week.current = true;
                }

                this.week.days.push(day);
            }

            this.loading = false;
        });
    }

    public getDuration(v) {
        var end = moment(v.EndDate + " " + v.EndTime);
        
        var start = moment(v.StartDate + " " + v.StartTime);
        if(moment.duration(end.diff(start)).asDays()>=1){
            end = moment(v.StartDate + " " + "24:00:00")
        }
        //console.log(moment.duration(end.diff(start)).asHours() * 120);
        
        return this.height = moment.duration(end.diff(start)).asHours() * 100;
    }

    public getStart(v) {
        var start = moment(v.StartDate + " " + v.StartTime);
        //console.log((start.hours() + (start.minutes()/60)) * 120);
        return this.diff = ((start.hours() + (start.minutes()/60)) * 100) - this.diff - this.height;
    }

    public resetVars(){
        this.diff = 0;
        this.height = 0;
        console.log("success");
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
