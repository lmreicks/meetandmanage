import { Component, Input } from '@angular/core';
import { ApiEvent } from '../../app/models/event';
import * as moment from 'moment';
import { Colors } from '../../app/models/colors';

@Component({
    selector: 'event-list',
    templateUrl: 'event-list.component.html',
    styleUrls: ['event-list.component.less']
})

export class EventListComponent {
    @Input('events') events: ApiEvent[];

    ngOnInit(): void {
        this.parseEvents(this.events);
    }

    static getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    private parseEvents(events: ApiEvent[]): void {
        let last;
        events.forEach(event => {
            event.height = this.getDuration(event);
            event.start = this.getStart(event);
            event.Color = Colors[EventListComponent.getRandomInt(Colors.length)];
            if (!last) last = event; else if (last.height + last.start > event.height) event.overlap = true;
        });
    }

    /**
     * calculates the duration of a given event and puts it in terms of pixels in order to display it.
     * @param v the given event
     */
    public getDuration(event: ApiEvent) {
        let end = moment(event.End);
        let start = moment(event.Start);
        let diff = moment.duration(end.diff(start)).as('hours');

        return diff * 50;
    }

    /**
     * calculates the amount of time between the start of the day and the start of a given event and puts it in terms of pixels in order to display it.
     * @param v the given event
     */
    public getStart(event: ApiEvent) {
        let start = moment(event.Start);
        let diff = moment.duration(start.diff(moment(event.Start).startOf('day'))).as('hours');

        return diff * 50;
    }
}