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

/**
 * Header component for changing/displaying date
 */
export class HeaderComponent {
    /**
     * Active date 
     */
    public active: moment.Moment = moment();
    /**
     * Depending on view, displays month, year or just year
     */
    public monthYearDisplay: string;
    /**
     * View
     */
    public granularity: string;
    /**
     * year, month, and day are used for routing
     */
    public year: number;
    public month: number;
    public day: number;

    public groups: boolean = false;

    constructor(private auth: AuthService,
                private route: ActivatedRoute,
                private dashboardService: DashboardService,
                private router: Router) {}

    /**
     * Oninit we subscribe to the url, so when the url changes the header is updated
     */
    ngOnInit(): void {
        this.dashboardService.current.subscribe(date => {
            this.active = date;
            this.monthYearDisplay = date.format('MMMM YYYY');
        });

        this.granularity = this.dashboardService.granularity;
    }

    /**
     * Changes the view
     * @param g 
     */
    public changeGranularity(g: moment.unitOfTime.DurationConstructor): void {
        this.granularity = g;

        if (this.year && this.month && this.day) {
            this.router.navigate(['dashboard', g, this.year, this.month, this.day]);
        } else {
            this.router.navigate(['dashboard', g]);
        }
    }

    /**
     * Moves back or forward 1 granularity
     * @param index 
     */
    public move(index: number): void {
        switch (this.granularity) {
            case 'week':
                this.active.add(index * 7, 'days');
                break;
            case 'day':
                this.active.add(index, 'days');
                break;
            case 'month':
                this.active.add(index, 'months');
                break;
        }

        this.changeDate(this.active);
    }

    /**
     * Updates the date in the dashboard service and the active date
     * @param {Moment} moment 
     */
    public changeDate(moment: moment.Moment): void {
        this.monthYearDisplay = this.active.format('MMMM YYYY');
        this.dashboardService.changeDate(this.active);
    }

    /**
     * When the today button is clicked, set the active date to today
     */
    public today(): void {
        this.active = moment();
        this.changeDate(this.active);
    }

    /**
     * When logout button is clicked, log the user out
     */
    Logout(): void {
        this.auth.logout();
    }
}
