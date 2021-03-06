import { Component, ViewChild, ElementRef } from '@angular/core';
import { CoreCacheService } from '../../app/services/core-cache.service';
import { DateObject, Day } from '../models';
import {DATE_FORMAT} from '../../constants.module';
import * as moment from 'moment';
import { ApiEvent } from '../../app/models/event';
import { DashboardService } from '../dashboard.service';
import { ApiTodo } from '../../app/models/todo';
import { ApiWorkout } from '../../app/models/workout';

@Component({
    selector: 'mnm-day',
    templateUrl: 'day.component.html',
    styleUrls: ['day.component.less', '../shared/shared.less']
})

/**
 * daily view that contains information about events, todos, workouts, and groups.
 */
export class DayComponent {
    @ViewChild('timeIndicator') timeInticator: ElementRef;
    public current: moment.Moment;
    public map: Map<string, Day>;
    public day: Day;
    public hours: string[] = [];
    public loading: boolean = true;

    private diff = 0;
    private height = 0;

    constructor(private coreCache: CoreCacheService,
                private dashboardService: DashboardService) {}

    /**
     * On init of this component, we want to get the date map and subscribe to the current date
     */
    ngOnInit(): void {
        this.loading = true;
        this.setHours();

        this.coreCache.GetDayMap().then(map => {
            this.map = map;
            this.dashboardService.current.subscribe(cur => {
                this.current = cur;
                this.parseDay(this.current.clone());
                this.loading = false;
            });
        });
    }

    ngAfterViewChecked(): void {
        if (this.timeInticator) {
            let offset = moment.duration(moment().diff(moment().startOf('day'))).as('hours');
            this.timeInticator.nativeElement.style.top = offset * 50 - 10 + "px";
        }
    }

    /**
     * parses all the events for a given day and puts them in the proper format to be displayed
     * @param curr a given day moment
     */
    public parseDay(curr: moment.Moment): void {
        this.diff = 0;
        this.height = 0;
        let today = moment().format(DATE_FORMAT);
        let date = curr.format(DATE_FORMAT);

        let dateValue: DateObject = {
            current: curr.format(DATE_FORMAT) === today,
            display: curr.format('dddd, MMMM D'),
            moment: curr.utc()
        };

        this.day = this.map.has(date) ? this.map.get(date) : { day: dateValue, events: [], todos: [], workouts: []}
        this.day.day = dateValue;
    }

    public changeDate(date: Date): void {
        this.dashboardService.changeDate(moment(date));
    }

    /**
     * creates an array containing the ours in a day in order to display them.
     */
    private setHours(): void {
        this.hours.push(12 + 'am');
        for (let i = 1; i < 24; i++) {
            if (i < 12) {
                this.hours.push(i + 'am');
            } else if (i === 12) {
                this.hours.push(i + 'pm');
            } else {
                this.hours.push(i - 12 + 'pm');
            }
        }
    }
}