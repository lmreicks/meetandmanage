import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'mnm-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.less']
})

export class LoginComponent {
    public username: string = null;
    public password: string = null;

    constructor(private loginService: LoginService, public router: Router, private authService: AuthService) {}

    Login(): void {
        this.authService.login();
    }
}
