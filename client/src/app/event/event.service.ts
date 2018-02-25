import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ReplaySubject } from 'rxjs';
import { ApiEvent, ApiCreateEvent } from '../models/event';
import { Observable } from 'rxjs';
import { API_ROOT } from '../../constants.module';
import { Router } from '@angular/router';

@Injectable()

export class EventService {
    private url: string = API_ROOT + '/event';
    public editEvent: Observable<ApiEvent | ApiCreateEvent> = new Observable<ApiEvent | ApiCreateEvent>();
    constructor(private http: Http, private router: Router) {}

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
