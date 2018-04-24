import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiGroup } from '../../models/group';
import { API_ROOT } from '../../../constants.module';

@Injectable()

export class RecommendedService {
    constructor(private http: Http) {}

    GetAll(): Promise<ApiGroup[]> {
        return this.http.get(API_ROOT + '/recommended').map(res => res.json()).toPromise();
    }
}
