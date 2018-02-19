import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_ROOT } from '../../constants.module';
import 'rxjs/add/observable/throw';

@Injectable()

export class LoginService {
    constructor(private http: Http) {}

    Login(username: string, passsword: string): Observable<Response> {
        return this.http.post(API_ROOT + '/login', { username: username, passsword: passsword })
            .map(res => {
                // add session token to local storage
                localStorage.setItem('token', '234234234324');
                return res.json();
            })
            .catch((err) => {
                console.log(err);
                err = err ? err.message : 'err';
                return Observable.throw(err);
            });
    }
}