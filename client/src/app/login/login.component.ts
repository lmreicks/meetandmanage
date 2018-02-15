import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
    selector: 'mnm-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.less']
})

export class LoginComponent {
    public username: string = null;
    public password: string = null;

    constructor(private loginService: LoginService) {}

    Login(): void {
        this.loginService.Login(this.username, this.password);
    }
}