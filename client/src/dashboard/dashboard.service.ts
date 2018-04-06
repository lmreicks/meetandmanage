import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class DashboardService {
    public current: ReplaySubject<moment.Moment> = new ReplaySubject();

    constructor() {
        this.changeDate(moment());
    }

    public changeDate(date: moment.Moment): moment.Moment {
        this.current.next(date);
        return date;
    }
}
