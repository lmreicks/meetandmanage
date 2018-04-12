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

/**
 * Main service for parsing, holding, and maintaining our information
 */
export class CoreCacheService {
    currentUser: ApiUser;
    payload: PayloadModel;
    promiseForData: Promise<PayloadModel>;
    constructor(private http: Http) {}
    private events: ApiEvent[];
    private dateMap: Map<string, ApiEvent[]>;
    private eventMap: Map<number, ApiEvent>;
    tempPayload: Promise<PayloadModel> = Promise.resolve(MockPayload);

    /**
     * When the user is authorized, this methods should be called to make a request to the payload
     */
    OnAuth(): Promise<PayloadModel> {
        this.promiseForData = this.Payload()
                .then(p => {
                    this.payload = p;
                    this.ParseEvents(this.payload);
                    return this.payload;
                });

        return this.promiseForData;
    }

    /**
     * Request for the payload
     */
    Payload(): Promise<PayloadModel> {
        return this.http.get(API_ROOT + '/payload')
            .map(res => res.json(), err => new Observable(err))
            .toPromise();
    }

    /**
     * Parses the events and group events
     * 1. Sorts them by date
     * 2. Adds them to the date map
     * 3. Adds them to the event map
     * @param {PayloadModel} payload 
     */
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

    /**
     * Sorts events by Start date
     * @param {ApiEvent[]} events 
     */
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

    /**
     * Adds a new event to the maps
     * @param {ApiEvent} event 
     */
    public AddEvent(event: ApiEvent): void {
        if (this.dateMap.has(event.StartDate)) {
            this.dateMap.get(event.StartDate).push(event);
        }
        this.eventMap.set(event.Id, event);
    }

    /**
     * Returns the date map
     */
    public GetDateMap(): Promise<Map<string, ApiEvent[]>> {
        return this.promiseForData.then(payload => this.dateMap);
    }

    /**
     * Returns the event map
     */
    public GetEventMap(): Promise<Map<number, ApiEvent>> {
        if (this.eventMap) {
            return new Promise(resolve => resolve(this.eventMap));
        } else {
            return this.promiseForData.then(payload => this.eventMap);
        }
    }

    /**
     * Gets all groups from the payload
     */
    public GetGroups(): Promise<ApiGroup[]> {
        if (this.payload) {
            return new Promise(resolve => resolve(this.payload.Groups));
        } else {
            return this.promiseForData.then(payload => this.payload.Groups);
        }
    }

    /**
     * Gets a specific group from the payload
     * @param {number} groupId 
     */
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

    /**
     * Adds a group to the list of groups in the payload
     * @param {ApiGroup} group 
     */
    public AddGroup(group: ApiGroup): ApiGroup {
        this.GetGroups().then(groups => groups.push());
        return group;
    }

    /**
     * Filters events by group (should or should not show on calendar)
     * @param {ApiGroup} group 
     */
    public FilterEventsByGroup(group: ApiGroup): void {
        if (this.events) {
            group.Events.forEach(event => {
                event.Hidden = !group.ShowEvents;
            });
        }
    }
}

