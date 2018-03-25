import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiUser, ApiCreateUser } from '../models/user';
import { API_ROOT } from '../../constants.module';

@Injectable()

export class UserService {
    constructor(private http: Http) {}

    public GetAll(): Promise<ApiUser[]> {
        return this.http.get(API_ROOT + '/user')
                .map(res => res.json())
                .toPromise();
    }

    public Get(id: number): Promise<ApiUser> {
        return this.http.get(API_ROOT + '/user')
                .map(res => res.json())
                .toPromise();
    }

    public Create(user: ApiCreateUser): Promise<ApiUser> {
        return this.http.post(API_ROOT + '/user', user)
                .map(res => res.json())
                .toPromise();
    }
}
