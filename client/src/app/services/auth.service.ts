
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { API_ROOT } from '../../constants.module';
import { Observable } from 'rxjs';
import { CoreCacheService } from './core-cache.service';
import { google } from 'googleapis';

@Injectable()
/**
 * Service for authentication, login, logout, and saving session token
 */
export class AuthService {

  constructor(public router: Router, private http: Http, private coreCache: CoreCacheService) {
    if (this.isAuthenticated()) {
      this.coreCache.OnAuth();
    }
  }

  /**
   * Logs a user in on the server
   * @param { email: string, password: string } userInfo 
   */
  public login(userInfo: { email: string, password: string }): Observable<any> {
    return this.http.post(API_ROOT + '/login', userInfo).map(res => {
      res = res.json();
      this.setSession(res);
      return res;
    }, err => {
        err = err ? err.json().message : 'Username or password incorrect';
        return Observable.throw(err);
    });
  }

  public register(userInfo: { name: string, email: string, password: string }): Observable<any> {
    return this.http.post(API_ROOT + '/register', userInfo).map(res => {
      res = res.json();
      this.setSession(res);
      return res;
    }, err => {
        err = err ? err.json().message : 'Username or password incorrect';
        return Observable.throw(err);
    });
  }

  private setSession(authResult): void {
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('user_id', authResult.user.id);
    this.coreCache.currentUser = authResult.user;
    this.coreCache.OnAuth();
  }

  /**
   * Logs user out on the server
   */
  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    // Go back to the home route
    this.router.navigate(['login']);
  }

  /**
   * Checks if a current user is authenticated
   */
  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    return localStorage.getItem('access_token') != null;
  }
}
