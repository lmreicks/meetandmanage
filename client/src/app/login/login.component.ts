import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'mnm-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.less']
})

export class LoginComponent {
    public loginForm: FormGroup;

    constructor(public router: Router, private authService: AuthService, private fb: FormBuilder) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
    }

    Login(userInfo: { email: string, password: string }, valid: boolean): void {
        console.log(userInfo, valid);
        if (valid) {
            this.authService.login(userInfo).subscribe(res => {
                console.log(res);
                this.router.navigate(['/']);
            }, err => {
                console.log(err);
            });
        } else {
            return;
        }
    }
}
