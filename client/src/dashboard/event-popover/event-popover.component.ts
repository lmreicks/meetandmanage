import { Component, Input } from '@angular/core';
import { ApiEvent } from '../../app/models/event';

@Component({
    selector: 'mnm-event-popover',
    templateUrl: 'event-popover.component.html',
    styleUrls: ['event-popover.component.less']
})

export class EventPopoverComponent {
    @Input('event') event: ApiEvent;
    constructor() {}
}
