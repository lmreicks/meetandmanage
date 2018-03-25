import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiGroup, ApiCreateGroup } from '../models/group';
import { API_ROOT } from '../../constants.module';

@Injectable()

export class GroupService {
    constructor(private http: Http) {}

    public Get(id: number): Promise<ApiGroup> {
        return this.http.get(API_ROOT + '/group/' + id)
            .map(res => res.json())
            .toPromise();
    }

    public GetAll(): Promise<ApiGroup[]> {
        return this.http.get(API_ROOT + '/group')
            .map(res => res.json())
            .toPromise();
    }

    public Create(group: ApiCreateGroup): Promise<ApiGroup> {
        return this.http.post(API_ROOT + '/group', group)
            .map(res => res.json())
            .toPromise();
    }
}
