import { Component, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from '../../app/services/auth.service';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { DATE_FORMAT } from '../../constants.module';
import { DashboardService } from '../dashboard.service';

@Component({
    selector: 'mnm-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.less']
})

export class HeaderComponent {
    public current: moment.Moment = moment();
    public monthYearDisplay: string;
    public granularity: string;
    public year: number;
    public month: number;
    public day: number;

    constructor(private auth: AuthService,
                private route: ActivatedRoute,
                private dashboardService: DashboardService,
                private router: Router) {}

    ngOnInit(): void {
        this.route.children[0].url.subscribe((url: UrlSegment[]) => {
            this.granularity = url[0].path;

            if (url.length === 4) {
                this.year = +url[1].path;
                this.month = +url[2].path;
                this.day = +url[3].path;

                this.current = moment(this.year + '-' + this.month + '-' + this.day, DATE_FORMAT);
            }

            this.monthYearDisplay = this.current.format('MMMM YYYY');
        });
    }

    public changeGranularity(g: moment.unitOfTime.DurationConstructor): void {
        this.granularity = g;

        if (this.year && this.month && this.day) {
            this.router.navigate(['dashboard', g, this.year, this.month, this.day]);
        } else {
            this.router.navigate(['dashboard', g]);
        }
    }

    public move(index: number): void {
        switch (this.granularity) {
            case 'week':
                this.current.add(index * 7, 'days');
                break;
            case 'day':
                this.current.add(index, 'days');
                break;
            case 'month':
                this.current.add(index, 'months');
                break;
        }
        this.changeDate(this.current);
    }

    public changeDate(moment: moment.Moment): void {
        this.monthYearDisplay = this.current.format('MMMM YYYY');
        this.dashboardService.current.next(this.current);
    }

    public today(): void {
        this.current = moment();
        this.changeDate(this.current);
    }

    Logout(): void {
        this.auth.logout();
    }
}
