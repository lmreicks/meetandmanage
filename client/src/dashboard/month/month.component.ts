import { Component } from '@angular/core';
import * as moment from 'moment';
import { ApiEvent, ApiCreateEvent } from '../../app/models/event';
import { CoreCacheService } from '../../app/services';
import { DateObject, DATE_FORMAT, TIME_FORMAT } from '../models/date.model';
import { Month, Months } from '../models/month.model';
import { Week, WeekDays } from '../models/week.model';
import { Day } from '../models';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from '../../app/services/session.service';
import { EventService } from '../../app/event/event.service';

@Component({
    selector: 'mnm-month',
    templateUrl: 'month.component.html',
    styleUrls: ['month.component.less']
})

export class MonthComponent {
    public month: Month;
    private eventMap: Map<string, ApiEvent[]>;
    public loading: boolean = true;
    public currentMonth: number = moment().month();
    public event: ApiEvent;

    constructor(private coreCache: CoreCacheService, private eventService: EventService, private sessionService: SessionService) {}

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

        let currentFormat = moment().format(DATE_FORMAT);

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
              current: dayMoment.format(DATE_FORMAT) === currentFormat,
              display: dayMoment.format('D'),
              future: dayMoment.isAfter(endOfMonth),
              past: dayMoment.isBefore(startOfMonth),
              utcDateValue: dayMoment.valueOf()
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

    doubleClickDay(click: MouseEvent, day: Day) {
        let event: ApiCreateEvent | ApiEvent = {
            Title: "",
            OwnerId: this.sessionService.currentUserId,
            StartDate: moment(day.day.utcDateValue).format(DATE_FORMAT),
            EndDate: moment(day.day.utcDateValue).format(DATE_FORMAT),
            StartTime: moment().format(TIME_FORMAT),
            EndTime: moment().add(1, 'hour').format(TIME_FORMAT),
            Notes: "",
            Members: []
        };
        if (click.srcElement.classList.contains('event')) {
            day.events.forEach(e => {
                if (e.Id == parseInt(click.srcElement.id)) {
                    this.eventService.EditEvent(e);
                    return;
                }
            });
        } else {
            this.eventService.EditEvent(event);
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


