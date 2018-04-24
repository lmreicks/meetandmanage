import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiEvent, ApiCreateEvent, NotificationGranularity } from '../models/event';
import { Observable } from 'rxjs';
import { API_ROOT } from '../../constants.module';
import * as moment from 'moment';
import { TIME_FORMAT, DATE_FORMAT } from '../../constants.module';
import { SessionService } from '../services/session.service';
import { CoreCacheService } from '../services/core-cache.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Colors } from '../models/colors';
import { ApiGroup } from '../models/group';

@Injectable()

export class EventService {
    private url: string = API_ROOT + '/event';
    private events: Map<number, ApiEvent>;
    constructor(private http: Http,
                private sessionService: SessionService,
                private coreCache: CoreCacheService,
                private router: Router,
                private fb: FormBuilder) {}

    /**
     * Attempts to create an event in the server
     * If successful, adds to event maps
     * @returns { Promise<ApiEvent> } Newly created event
     */
    CreateEvent(event: ApiCreateEvent): Promise<ApiEvent> {
        return this.http.post(this.url, event)
            .map(res => {
                let apiEvent = res.json();

                this.coreCache.AddEvent(apiEvent);
                return apiEvent;
            }, err => {
                return {};
            })
            .toPromise();
    }

    /**
     * Builds a new event form from either a new or updatable event
     * @param {ApiCreateEvent | ApiEvent} event 
     * @param {FormGroup} form 
     */
    BuildEventForm(event: ApiCreateEvent | ApiEvent, form: FormGroup): FormGroup {
        form = this.fb.group({
            Title: [
                event.Title, Validators.required
            ],
            OwnerId: this.sessionService.currentUserId,
            Start: [
                moment(event.Start, DATE_FORMAT).toDate(),
                Validators.required
            ],
            End: [
                moment(event.End, DATE_FORMAT).toDate(),
                Validators.required
            ],
            AllDay: false,
            NotificationValue: [
                event.NotificationValue ? event.NotificationValue : 10
            ],
            NotificationGranularity: [
                event.NotificationGranularity ?
                event.NotificationGranularity : NotificationGranularity.Minutes
            ],
            Location: [
                event ? event.Location : ""
            ],
            Color: [
                event.Color ? event.Color : Colors[0]
            ],
            Notes: event.Notes,
            Members: this.fb.array([
                this.fb.group({
                    Id: null,
                    Name: '',
                    Email: ''
                })
            ]),
            Group: this._setGroup(event.GroupId),
            Recurring: false
        });

        form.controls.AllDay.valueChanges.subscribe(value => {
            let startOfDay = moment(form.controls.StartTime.value, TIME_FORMAT).startOf('day');
            let endOfDay = moment(form.controls.EndTime.value, TIME_FORMAT).endOf('day');

            form.controls.Start.setValue(startOfDay);
            form.controls.End.setValue(endOfDay);
        });

        form.controls.Start.setValidators(this._validateDate(form));
        form.controls.End.setValidators(this._validateDate(form));

        return form;
    }

    /**
     * Sets the group form control on the event
     * @param {number} groupId 
     */
    private _setGroup(groupId?: number): FormGroup {
        let g = this.fb.group({
            Id: null,
            Name: '',
            Description: ''
        });

        if (groupId) {
            this.coreCache.GetGroupById(groupId)
                .then(group => g.patchValue(group));
        }

        return g;
    }

    /**
     * Validates Start and End date
     * @param {FormGroup} form 
     */
    private _validateDate(form: FormGroup): ValidatorFn {
        let startDate = form.controls.StartDate;
        let endDate = form.controls.EndDate;

        return (control: AbstractControl): {[key: string]: any} => {
            let badDate = false;
            // if (!startDate.value || !moment(startDate.value).isValid()) {
            //    // badDate = true;
            // } else if (!endDate.value || !moment(endDate.value).isValid()) {
            //     // badDate = true;
            // } else if (moment(startDate.value).isAfter(moment(endDate.value))) {
            //     badDate = true;
            // }
            return badDate ? {'invalidDate': { value: true }} : null;
        };
    }

    /**
     * Gets an event either from the server or core cache by id
     * @param {number} id 
     */
    GetEventById(id: number): Promise<ApiEvent> {
        if (this.events) {
            let event = this.events.get(id);
            return new Promise((resolve, reject) =>  {
                if (event) {
                    resolve(event);
                } else {
                    reject('Not found');
                }
            });
        } else {
            return this.coreCache.GetEventMap().then(map => {
                this.events = map;
                if (this.events.has(id)) {
                    return this.events.get(id);
                } else {
                    this.router.navigate(['not-found']);
                    return null;
                }
            });
        }
    }
}
