import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { EventService } from '../event.service';
import { ApiEvent, ApiCreateEvent } from '../../models/event';
import { TIME_FORMAT } from '../../../dashboard/models/date.model';

@Component({
    selector: 'mnm-edit-event',
    templateUrl: 'edit-event.component.html',
    styleUrls: ['edit-event.component.less']
})

export class EditEventComponent {
    public event: ApiEvent | ApiCreateEvent;
    public eventForm: FormGroup;

    constructor(private fb: FormBuilder, private eventService: EventService) {
        this.eventService.editEvent.subscribe(event => {
            this.event = event;
            this._buildForm();
        });
    }

    private _buildForm(): void {
        this.eventForm = this.fb.group({
            Title: [this.event.Title, Validators.required],
            StartDate: [this.event.StartDate, Validators.required],
            StartTime: this._setStartTime(),
            EndTime: this._setEndTime()
        });
    }

    private _setStartTime(): FormControl {
        let time = {
            hours: moment(this.event.StartTime, TIME_FORMAT).hour(),
            minutes: moment(this.event.StartTime, TIME_FORMAT).minute()
        };
        return new FormControl(time, Validators.required);
    }

    private _setEndTime(): FormControl {
        let time = {
            hours: moment(this.event.EndTime, TIME_FORMAT).hour(),
            minutes: moment(this.event.EndTime, TIME_FORMAT).minute()
        };
        return new FormControl(time, Validators.required);
    }
}
