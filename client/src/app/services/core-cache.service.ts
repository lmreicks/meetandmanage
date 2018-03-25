import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { DateObject } from '../../dashboard/models/date.model';
import { ApiEvent } from '../models/event';
import * as moment from 'moment';
import { API_ROOT } from '../../constants.module';
import { ReplaySubject } from 'rxjs';
import { PayloadModel } from '../models/payload';
import { ApiUser } from '../models/user';
import { MockPayload } from '../models/mock-payload';

@Injectable()

export class CoreCacheService {
    currentUser: ApiUser;
    payload: PayloadModel;
    promiseForData: Promise<PayloadModel>;
    constructor(private http: Http) {}
    private dateMap: Map<string, ApiEvent[]>;
    private eventMap: Map<number, ApiEvent>;
    tempPayload: Promise<PayloadModel> = Promise.resolve(MockPayload);

    OnAuth(): Promise<PayloadModel> {
        this.promiseForData = this.tempPayload
                .then(p => {
                    this.payload = p;
                    this.ParseEvents(this.payload.Events);
                    return this.payload;
                });

        return this.promiseForData;
    }

    Payload(): Observable<ApiEvent[]> {
        return this.http.get(API_ROOT + '/event')
            .map(res => res.json(), err => new Observable(err));
    }

    private ParseEvents(events: ApiEvent[]): void {
        if (!events || events.length === 0) {
            return;
        }

        this._sortEvents(events);

        this.dateMap = new Map<string, ApiEvent[]>();
        this.eventMap = new Map<number, ApiEvent>();

        events.forEach(event => {
            this.eventMap.set(event.Id, event);

            if (this.dateMap.has(event.StartDate)) {
                this.dateMap.get(event.StartDate).push(event);
            } else {
                this.dateMap.set(event.StartDate, [event]);
            }
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

    public GetDateMap(): Promise<Map<string, ApiEvent[]>> {
        if (this.dateMap) {
            return new Promise(resolve => resolve(this.dateMap));
        } else {
            return this.promiseForData.then(payload => this.dateMap);
        }
    }

    public GetEventMap(): Promise<Map<number, ApiEvent>> {
        if (this.eventMap) {
            return new Promise(resolve => resolve(this.eventMap));
        } else {
            return this.promiseForData.then(payload => this.eventMap);
        }
    }
}

interface Day {
    day: DateObject;
    events: ApiEvent[];
}
