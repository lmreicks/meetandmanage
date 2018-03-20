import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ReplaySubject } from 'rxjs';
import { ApiEvent, ApiCreateEvent } from '../models/event';
import { Observable } from 'rxjs';
import { API_ROOT } from '../../constants.module';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { TIME_FORMAT, DATE_FORMAT } from '../../constants.module';
import { SessionService } from '../services/session.service';

@Injectable()

export class EventService {
    private url: string = API_ROOT + '/event';
    public editEvent: Observable<ApiEvent | ApiCreateEvent>;
    constructor(private http: Http, private router: Router, private sessionService: SessionService) {
        let creatEvent: ApiCreateEvent | ApiEvent = {
            Title: "",
            OwnerId: this.sessionService.currentUserId,
            StartDate: moment().format(DATE_FORMAT),
            EndDate: moment().format(DATE_FORMAT),
            StartTime: moment().format(TIME_FORMAT),
            EndTime: moment().add(1, 'hour').format(TIME_FORMAT),
            Notes: "",
            Members: []
        };
        this.editEvent = Observable.of(creatEvent);
    }

    EditEvent(event: ApiEvent | ApiCreateEvent): void {
        this.editEvent = Observable.of(event);
        this.router.navigate(['event/edit']);
    }

    CreateEvent(event: ApiCreateEvent): Observable<ApiEvent> {
        return this.http.post(this.url, event)
            .map(res => res.json())
            .catch(err => err ? err.json() : "Err");
    }
}
