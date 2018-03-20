import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { EventService } from '../event.service';
import { ApiEvent, ApiCreateEvent } from '../../models/event';
import { TIME_FORMAT, DATE_FORMAT } from '../../../constants.module';

@Component({
    selector: 'mnm-edit-event',
    templateUrl: 'edit-event.component.html',
    styleUrls: ['edit-event.component.less']
})

export class EditEventComponent {
    public event: ApiEvent | ApiCreateEvent;
    public eventForm: FormGroup;
    public startTimes: any[] = [];
    public endTimes: any[]= [];

    constructor(private fb: FormBuilder, private eventService: EventService) {
        if (this.eventService.editEvent) {
            this.eventService.editEvent.subscribe(event => {
                this.event = event;
                this._buildForm();
            });
        }
    }

    private _buildForm(): void {
        this.eventForm = this.fb.group({
            Title: [
                this.event.Title, Validators.required
            ],
            StartDate: [
                moment(this.event.StartDate, DATE_FORMAT).toDate(),
                Validators.required
            ],
            EndDate: [
                moment(this.event.EndDate, DATE_FORMAT).toDate(),
                Validators.required
            ],
            StartTime: this._setStartTime(),
            EndTime: this._setEndTime(),
            Recurring: false
        });

        this.eventForm.get('StartDate').valueChanges.subscribe(value => {
            if (!this.eventForm.get('Recurring').value) {
                this.eventForm.get('EndDate').setValue(value);
            }
        });
    }

    private _setStartTime(): FormControl {
        let start = moment(this.event.StartTime, TIME_FORMAT);

        for (let i = 0 ; i < 12; i++) {
            let tempTime = moment(start).add(i, 'hours');
            this.startTimes[i] = {
                value: tempTime.format(TIME_FORMAT),
                label: tempTime.format('hh:mma')
            };
        }
        return new FormControl(start.format(TIME_FORMAT), Validators.required);
    }

    private _setEndTime(): FormControl {
        let start = moment(this.event.EndTime, TIME_FORMAT);

        for (let i = 0; i < 12; i++) {
            let tempTime = moment(start).add(i, 'hours');
            this.endTimes[i] = {
                value: tempTime.format(TIME_FORMAT),
                label: tempTime.format('hh:mma')
            };
        }
        return new FormControl(start.format(TIME_FORMAT), Validators.required);
    }

    public formatDate(date: Date): string {
        return moment(date).format('dddd, MMMM Do YYYY');
    }
}
