import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { DateObject } from '../../dashboard/month/month.component';
import { ApiEvent } from '../models/event';
import * as moment from 'moment';
import { API_ROOT } from '../../constants.module';
import { ReplaySubject } from 'rxjs';

@Injectable()

export class CoreCacheService {
    payload: ReplaySubject<Map<number, Year>> = new ReplaySubject();
    years: Map<number, Year> = new Map<number, Year>();
    constructor(private http: Http) {}

    Payload(): Observable<ApiEvent[]> {
        return this.http.get(API_ROOT + '/event')
            .map(res => res.json())
            .catch(err => err.json());
    }

    CreateEvent(): Observable<any> {
        let event: ApiEvent = {
            Title: 'title',
            OwnerId: 1,
            StartDate: new Date(),
            EndDate: new Date(),
            StartTime: new Date().toTimeString(),
            EndTime: new Date().toTimeString(),
            Members: []
        };
        return this.http.post(API_ROOT + '/event', event)
            .map(res => res.json())
            .catch(err => err.json())
            .share();
    }

    GetPayload(): void {
        this.Payload().subscribe(events => {
            if (!events || events.length === 0) {
                return;
            }

            this._sortEvents(events);

            let year: Year = {
                months: new Map<number, Month>()
            };

            let currMonth = moment(events[0].StartDate).month();
            let currDay = moment(events[0].StartDate).day();

            events.forEach(event => {
                if (year.months.has(currMonth)) {
                    let days = year.months.get(currMonth).days;
                    if (days.has(currDay)) {
                        days.get(currDay).events.push(event);
                    } else {
                        currDay = moment(event.StartDate).day();
                        days.set(currDay, {
                            day: this._getDateObject(event),
                            events: [event]
                        });
                    }
                } else {
                    currMonth = moment(event.StartDate).month();
                    year.months.set(currMonth, {
                        days: new Map<number, Day>()
                    });
                }
            });

            this.years.set(moment().year(), year);
            this.payload.next(this.years);
        });
    }

    private _sortEvents(events: ApiEvent[]) {
        events.sort((a, b) => {
            if (a.StartDate < b.StartDate) {
                return -1;
            } else if (a.StartDate === b.StartDate) {
                return 0;
            } else {
                return 1;
            }
        });
    }

    private _getDateObject(event: ApiEvent): DateObject {
        let selectedDate = moment.utc(moment());
        let startOfMonth = moment.utc(selectedDate).startOf('month');
        let endOfMonth = moment.utc(selectedDate).endOf('month');

        let dayFormat = 'YYYY-MMM-DD';

        let currentFormat = moment().format(dayFormat);
        let dayMoment = moment(event.StartDate).startOf('day');

        let dateObject: DateObject = {
            current: dayMoment.format(dayFormat) === currentFormat,
            display: dayMoment.format('D'),
            future: dayMoment.isAfter(endOfMonth),
            past: dayMoment.isBefore(startOfMonth),
            utcDateValue: dayMoment.valueOf()
        };

        return dateObject;
    }
}

interface Day {
    day: DateObject;
    events: ApiEvent[];
}

interface Month {
    days: Map<number, Day>;
}

interface Year {
    months: Map<number, Month>;
}
