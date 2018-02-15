import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class LoginService {
    constructor(private http: Http) {}

    Login(username: string, passsword: string): Observable<Response> {
        return this.http.post('', { username: username, passsword: passsword})
            .map(res => {
                // add session token to local storage
                return res.json();
            })
            .catch(err => {
                return Observable.throw(err.json());
            });
    }
}