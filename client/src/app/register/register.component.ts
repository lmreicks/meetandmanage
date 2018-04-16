import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'mnm-register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.less']
})

export class RegisterComponent {
    public registerForm: FormGroup;

    constructor(public router: Router, private authService: AuthService, private fb: FormBuilder) {
        this.registerForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
    }

    Register(userInfo: { name: string, email: string, password: string }, valid: boolean): void {
        console.log(userInfo, valid);
        if (valid) {
            this.authService.register(userInfo).subscribe(res => {
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
