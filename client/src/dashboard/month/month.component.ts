import { Component, Input, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { ApiEvent } from '../../app/models/event';
import { CoreCacheService } from '../../app/services/core-cache.service';
import { DateObject } from '../models/date.model';
import { DATE_FORMAT, TIME_FORMAT } from '../../constants.module';
import { Month, Months } from '../models/month.model';
import { Week, WeekDays } from '../models/week.model';
import { Day } from '../models';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from '../../app/services/session.service';
import { EventService } from '../../app/event/event.service';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { DashboardService } from '../dashboard.service';

@Component({
    selector: 'mnm-month',
    templateUrl: 'month.component.html',
    styleUrls: ['month.component.less']
})

export class MonthComponent {
    public date: moment.Moment;
    public month: Month;
    private eventMap: Map<string, ApiEvent[]>;
    public loading: boolean = true;
    public event: ApiEvent;

    constructor(private coreCache: CoreCacheService,
                private eventService: EventService,
                private sessionService: SessionService,
                private dashboardService: DashboardService,
                private router: Router) {}

    ngOnInit(): void {
        this.loading = true;

        this.coreCache.GetDateMap().then(map => {
            this.eventMap = map;
            this.dashboardService.current.subscribe(current => {
                this.date = current;
                this.parseMonth(this.date.clone());
                this.loading = false;
            });
        });
    }

    parseMonth(month: moment.Moment): void {
        let startOfMonth = moment.utc(month).startOf('month');
        let endOfMonth = moment.utc(month).endOf('month');

        let startDate = moment.utc(startOfMonth).subtract(Math.abs(startOfMonth.weekday()), 'days');

        let currentFormat = moment().format(DATE_FORMAT);

        this.month = {
            name: Months[this.date.month()],
            weeks: [],
            weekdays: WeekDays
        };

        for (let i = 0; i < 5; i++) {
          let week: Week = {
              days: [],
              current: false
          };
          for (let j = 0; j < 7; j++) {
            let dayMoment = moment.utc(startDate).add((i * 7) + j, 'days');

            let dateValue: DateObject = {
              current: dayMoment.format(DATE_FORMAT) === currentFormat,
              active: dayMoment.format(DATE_FORMAT) === this.date.format(DATE_FORMAT),
              display: dayMoment.format('D'),
              future: dayMoment.isAfter(endOfMonth),
              past: dayMoment.isBefore(startOfMonth),
              moment: dayMoment
            };

            let day = {
                day: dateValue,
                events: []
            };

            if (this.eventMap.has(dayMoment.format(DATE_FORMAT))) {
                day.events = this.eventMap.get(dayMoment.format(DATE_FORMAT));
                week.current = true;
            }

            week.days.push(day);
          }
          this.month.weeks.push(week);
        }
    }

    friendlyTime(time: string): string {
        let date = moment(time, TIME_FORMAT);
        return date.format('hh:mm a');
    }

    doubleClickDay(click: MouseEvent, day: Day): void {
        this.router.navigate(['event/create']);
    }

    doubleClickEvent(click: MouseEvent, event: ApiEvent): void {
        this.router.navigate(['event', event.Id]);
    }

    togglePopover(popover: NgbPopover, event: ApiEvent): void {
        if (popover.isOpen()) {
            popover.close();
        } else {
            this.event = event;
            popover.open(event);
        }
    }
}


