import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { DateObject } from '../../dashboard/models/date.model';
import { ApiEvent } from '../models/event';
import * as moment from 'moment';
import { API_ROOT } from '../../constants.module';
import { ReplaySubject } from 'rxjs';

@Injectable()

export class CoreCacheService {
    payload: ReplaySubject<Map<string, ApiEvent[]>> = new ReplaySubject();
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
            StartDate: moment().format('YYYY-MM-DD'),
            EndDate: moment().format('YYYY-MM-DD'),
            StartTime: moment().format('hh:mm:ss'),
            EndTime: moment().format('hh:mm:ss'),
            Members: []
        };
        return this.http.post(API_ROOT + '/event', event)
            .map(res => res.json())
            .catch(err => err.json())
            .share();
    }

    GetPayload(): void {
        this.Payload().subscribe(events => {
            if (!events) {
                events = [];
            }

            this._sortEvents(events);

            let map = new Map<string, ApiEvent[]>();

            events.forEach(event => {
                if (map.has(event.StartDate)) {
                    map.get(event.StartDate).push(event);
                } else {
                    map.set(event.StartDate, [event]);
                }
            });
            this.payload.next(map);
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
