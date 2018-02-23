import { Component } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'mnm-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.less']
})

export class HeaderComponent {
    constructor(private auth: AuthService) {}

    Logout(): void {
        this.auth.logout();
    }
}
