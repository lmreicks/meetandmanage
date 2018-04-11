import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { DateObject } from '../../dashboard/models/date.model';
import { ApiEvent } from '../models/event';
import { API_ROOT } from '../../constants.module';
import { PayloadModel } from '../models/payload';
import { ApiUser } from '../models/user';
import { MockPayload } from '../models/mock-payload';
import { ApiGroup } from '../models/group';

@Injectable()

export class CoreCacheService {
    currentUser: ApiUser;
    payload: PayloadModel;
    promiseForData: Promise<PayloadModel>;
    constructor(private http: Http) {}
    private events: ApiEvent[];
    private dateMap: Map<string, ApiEvent[]>;
    private eventMap: Map<number, ApiEvent>;
    tempPayload: Promise<PayloadModel> = Promise.resolve(MockPayload);

    OnAuth(): Promise<PayloadModel> {
        this.promiseForData = this.Payload()
                .then(p => {
                    this.payload = p;
                    this.ParseEvents(this.payload);
                    return this.payload;
                });

        return this.promiseForData;
    }

    Payload(): Promise<PayloadModel> {
        return this.http.get(API_ROOT + '/payload')
            .map(res => res.json(), err => new Observable(err))
            .toPromise();
    }

    private ParseEvents(payload: PayloadModel): void {
        this.events = payload.Events;

        payload.Groups.forEach(group => {
            group.ShowEvents = true;
            this.events = this.events.concat(group.Events);
        });

        if (this.events.length === 0) {
            return;
        }

        this._sortEvents(this.events);

        this.dateMap = new Map<string, ApiEvent[]>();
        this.eventMap = new Map<number, ApiEvent>();

        this.events.forEach(event => {
            event.Hidden = false;
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

    public AddEvent(event: ApiEvent): void {
        if (this.dateMap.has(event.StartDate)) {
            this.dateMap.get(event.StartDate).push(event);
        }
        this.eventMap.set(event.Id, event);
    }

    public GetDateMap(): Promise<Map<string, ApiEvent[]>> {
        return this.promiseForData.then(payload => this.dateMap);
    }

    public GetEventMap(): Promise<Map<number, ApiEvent>> {
        if (this.eventMap) {
            return new Promise(resolve => resolve(this.eventMap));
        } else {
            return this.promiseForData.then(payload => this.eventMap);
        }
    }

    public GetGroups(): Promise<ApiGroup[]> {
        if (this.payload) {
            return new Promise(resolve => resolve(this.payload.Groups));
        } else {
            return this.promiseForData.then(payload => this.payload.Groups);
        }
    }

    public GetGroupById(groupId: number): Promise<ApiGroup> {
        return this.GetGroups()
            .then(groups => {
                let index = groups.map(x => x.Id).indexOf(groupId);
                if (index > -1) {
                    return groups[index];
                } else {
                    return null;
                }
            });
    }

    public AddGroup(group: ApiGroup): ApiGroup {
        this.GetGroups().then(groups => groups.push());
        return group;
    }

    public FilterEventsByGroup(group: ApiGroup): void {
        if (this.events) {
            group.Events.forEach(event => {
                event.Hidden = !group.ShowEvents;
            });
        }
    }
}

interface Day {
    day: DateObject;
    events: ApiEvent[];
}
