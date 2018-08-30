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

/**
 * monthly view that contains information about events and groups.
 */
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
    
    /**
     * On init of this component, we want to get the date map and subscribe to the current date
     */
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

    /**
     * parses all the events and dates for a given month and puts them in the proper format to be displayed
     * @param month the given month moment
     */
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
                events: [],
                todos: [],
                workouts: []
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

    /**
     * Displays the time in a user friendly format based on a given military time
     * @param time the given military time
     */
    friendlyTime(time: string): string {
        let date = moment(time);
        return date.format('hh:mm a');
    }

    /**
     * routes the user to the create/edit event page based on a given day the user clicked
     * @param click records where the user clicks
     * @param day the given day that was clicked
     */
    doubleClickDay(click: MouseEvent, day: Day): void {
        this.router.navigate(['event/create']);
    }

    /**
     * displays the event pop-over for the user to view more details about a given event
     * @param click records where the user clicks
     * @param event the given event that was clicked
     */
    doubleClickEvent(click: MouseEvent, event: ApiEvent): void {
        this.router.navigate(['event', event.Id]);
    }

    /**
     * displays or hides a detailed pop-over for a given event
     * @param popover the selected pop-over for an event
     * @param event the given event
     */
    togglePopover(popover: NgbPopover, event: ApiEvent): void {
        if (popover.isOpen()) {
            popover.close();
        } else {
            this.event = event;
            popover.open(event);
        }
    }
}


