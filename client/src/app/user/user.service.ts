import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiUser, ApiCreateUser } from '../models/user';
import { API_ROOT } from '../../constants.module';

@Injectable()

export class UserService {
    constructor(private http: Http) {}

    /**
     * Gets all users from the server
     */
    public GetAll(): Promise<ApiUser[]> {
        return this.http.get(API_ROOT + '/user')
                .map(res => res.json())
                .toPromise();
    }

    /**
     * Gets a user from the server
     * @param {number} id
     */
    public Get(id: number): Promise<ApiUser> {
        return this.http.get(API_ROOT + '/user')
                .map(res => res.json())
                .toPromise();
    }

    /**
     * Attempts to create a new user
     * @param {ApiCreateUser} user 
     */
    public Create(user: ApiCreateUser): Promise<ApiUser> {
        return this.http.post(API_ROOT + '/user', user)
                .map(res => res.json())
                .toPromise();
    }
}
