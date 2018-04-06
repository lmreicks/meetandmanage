import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiEvent, ApiCreateEvent, NotificationGranularity } from '../models/event';
import { Observable } from 'rxjs';
import { API_ROOT } from '../../constants.module';
import * as moment from 'moment';
import { TIME_FORMAT, DATE_FORMAT } from '../../constants.module';
import { SessionService } from '../services/session.service';
import { CoreCacheService } from '../services';
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

    CreateEvent(event: ApiCreateEvent): Promise<ApiEvent> {
        return this.http.post(this.url, event)
            .map(res => {
                let apiEvent = res.json();

                this.coreCache.AddEvent(apiEvent);
                return apiEvent;
            })
            .toPromise();
    }

    BuildEventForm(event: ApiCreateEvent | ApiEvent, form: FormGroup): FormGroup {
        form = this.fb.group({
            Title: [
                event.Title, Validators.required
            ],
            OwnerId: this.sessionService.currentUserId,
            StartDate: [
                moment(event.StartDate, DATE_FORMAT).toDate(),
                Validators.required
            ],
            EndDate: [
                moment(event.EndDate, DATE_FORMAT).toDate(),
                Validators.required
            ],
            StartTime: [
                moment(event.StartTime, TIME_FORMAT).toDate(),
                Validators.required
            ],
            EndTime: [
                moment(event.EndTime, TIME_FORMAT).toDate(),
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
            let startOfDay = this._setTime(moment().startOf('day').format(TIME_FORMAT));
            let endOfDay = this._setTime(moment().endOf('day').format(TIME_FORMAT));

            form.controls.StartDate.setValue(startOfDay);
            form.controls.EndDate.setValue(endOfDay);
        });

        form.controls.StartDate.setValidators(this._validateDate(form));
        form.controls.EndDate.setValidators(this._validateDate(form));

        return form;
    }

    private _setTime(time: string): { hour: number, minute: number } {
        let tempTime = moment(time, TIME_FORMAT);
        return {
            hour: tempTime.hours(),
            minute: tempTime.minutes()
        };
    }

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
