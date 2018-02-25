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
import { PayloadModel } from '../models/payload';
import { ApiUser } from '../models/user';

@Injectable()

export class CoreCacheService {
    currentUser: ApiUser;
    payload: ReplaySubject<PayloadModel> = new ReplaySubject();
    constructor(private http: Http) {}
    eventMap: ReplaySubject<Map<string, ApiEvent[]>> = new ReplaySubject();

    OnAuth(): void {
        this.Payload().subscribe(events => {
            this.payload.next({
                User: {
                    id: +(localStorage.getItem('user_id')),
                    email: 'kdjf@iastate.edu',
                    remember_token: localStorage.getItem('access_token'),
                    name: 'ksdlfj'
                },
                Events: events
            });
            this.ParseEvents(events);
        });
    }

    Payload(): Observable<ApiEvent[]> {
        return this.http.get(API_ROOT + '/event')
            .map(res => res.json(), err => new Observable(err));
    }

    ParseEvents(events: ApiEvent[]): void {
        console.log(events);
        if (!events || events.length === 0) {
            return;
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
        this.eventMap.next(map);
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
}

interface Day {
    day: DateObject;
    events: ApiEvent[];
}
