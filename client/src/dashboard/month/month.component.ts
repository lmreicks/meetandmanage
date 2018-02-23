import { Component, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ApiEvent } from '../../app/models/event';
import { CoreCacheService } from '../../app/services';
import { DateObject, DateFormat } from '../models/date.model';
import { Month, Months } from '../models/month.model';
import { Week, WeekDays } from '../models/week.model';
import { Day } from '../models';
import { Router } from '@angular/router';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'mnm-month',
    templateUrl: 'month.component.html',
    styleUrls: ['month.component.less']
})

export class MonthComponent {
    @ViewChild('p') popover: NgbPopover;
    public month: Month;
    private eventMap: Map<string, ApiEvent[]>;
    public loading: boolean = true;
    public currentMonth: number = moment().month();
    public event: ApiEvent;

    constructor(private coreCache: CoreCacheService, private router: Router) {}

    ngOnInit(): void {
        this.loading = true;
        this.coreCache.eventMap.subscribe(map => {
            this.eventMap = map;
            this.parseMonth();
            this.loading = false;
        });
    }

    parseMonth(): void {
        let startOfMonth = moment.utc().startOf('month');
        let endOfMonth = moment.utc().endOf('month');

        let startDate = moment.utc(startOfMonth).subtract(Math.abs(startOfMonth.weekday()), 'days');

        let currentFormat = moment().format(DateFormat);

        this.month = {
            name: Months[this.currentMonth],
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
              current: dayMoment.format(DateFormat) === currentFormat,
              display: dayMoment.format('D'),
              future: dayMoment.isAfter(endOfMonth),
              past: dayMoment.isBefore(startOfMonth),
              utcDateValue: dayMoment.valueOf()
            };

            let day = {
                day: dateValue,
                events: []
            };

            if (this.eventMap.has(dayMoment.format(DateFormat))) {
                day.events = this.eventMap.get(dayMoment.format(DateFormat));
                week.current = true;
            }

            week.days.push(day);
          }
          this.month.weeks.push(week);
        }
    }

    friendlyTime(time: string): string {
        let date = moment(time);
        console.log(date);
        console.log(moment(moment().format('h:mma')));
        return moment().format('hh:mm:ss a');
    }

    doubleClickDay(event: MouseEvent, day: Day) {
        if (event.srcElement.classList.contains('event')) {
            console.log(event);
        } else {
            this.router.navigate(['event/create']);
        }
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


