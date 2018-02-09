import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()

export class CoreCacheService {
    constructor(private http: Http) {}

    GetPayload(): Observable<Event[]> {
        return this.http.get('api')
            .map(res => res.json())
            .catch(err => err.json());
    }
}
