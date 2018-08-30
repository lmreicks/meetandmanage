import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ReplaySubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class DashboardService {
    public current: ReplaySubject<moment.Moment> = new ReplaySubject();
    public granularity: string;

    constructor(private router: Router, private route: ActivatedRoute) {
        this.changeDate(moment());
    }

    public changeDate(date: moment.Moment): moment.Moment {
        this.current.next(date);
        return date;
    }
}
