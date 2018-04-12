import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormArray, FormControl, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { EventService } from '../event.service';
import { ApiEvent, ApiCreateEvent, NotificationGranularity } from '../../models/event';
import { TIME_FORMAT, DATE_FORMAT } from '../../../constants.module';
import { Colors } from '../../models/colors';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUser } from '../../models/user';
import { UserService } from '../../user/user.service';
import { CoreCacheService } from '../../services/core-cache.service';
import { ApiGroup } from '../../models/group';

@Component({
    selector: 'mnm-edit-event',
    templateUrl: 'edit-event.component.html',
    styleUrls: ['edit-event.component.less']
})

export class EditEventComponent {
    public edit: boolean = false;
    public event: ApiEvent | ApiCreateEvent;
    public eventForm: FormGroup;
    public colors: string[] = Colors;
    public notificationGranularity = NotificationGranularity;
    public showNotification: boolean = true;
    public users: ApiUser[];
    public groups: ApiGroup[];

    constructor(private route: ActivatedRoute,
                private router: Router,
                private eventService: EventService,
                private userService: UserService,
                private coreCache: CoreCacheService,
                private fb: FormBuilder) {}

    ngOnInit(): void {
        this.userService.GetAll().then(users => this.users = users);
        this.coreCache.GetGroups().then(groups => this.groups = groups);

        let id = this.route.snapshot.paramMap.get('id');
        if (!!id && id !== 'create') {
            this.edit = true;
            this.eventService
                .GetEventById(+id)
                .then(event => {
                    this.eventForm = this.eventService.BuildEventForm(event, this.eventForm);
                });
        } else {
            let createEvent: ApiCreateEvent = {
                Title: null,
                OwnerId: 3, // change this!!
                StartDate: moment().format(DATE_FORMAT),
                EndDate: moment().format(DATE_FORMAT),
                StartTime: moment().format(TIME_FORMAT),
                EndTime: moment().add(1, 'hour').format(TIME_FORMAT),
                Location: "", Color: "", Notes: "", Members: []
            };
            this.eventForm = this.eventService.BuildEventForm(createEvent, this.eventForm);
        }
    }

    public formatDate(date: Date): string {
        return moment(date).format('dddd, MMMM Do YYYY');
    }

    public setColor(color: string): void {
        this.eventForm.get('Color').setValue(color);
    }

    public setNotification(granularity: NotificationGranularity): void {
        this.eventForm.get('NotificationGranularity').setValue(granularity);
    }

    public getNotificationGranularity(): string {
        let value = +this.eventForm.get('NotificationGranularity').value;
        return this.notificationGranularity[value];
    }

    public removeNotification(): void {
        this.eventForm.get('NotificationGranularity').setValue(null);
        this.eventForm.get('NotificationValue').setValue(null);
        this.showNotification = false;
    }

    public getMembers(): AbstractControl[] {
        let arr = <FormArray>this.eventForm.controls.Members;
        return arr.controls;
    }

    public addMember(): void {
        let arr: FormArray = <FormArray>this.eventForm.controls.Members;

        // add new form control
        arr.push(this.fb.group({
            Id: null,
            Name: '',
            Email: ''
        }));
    }

    public removeMember(index: number): void {
        let arr: FormArray = <FormArray>this.eventForm.controls.Members;

        arr.removeAt(index);
    }

    public createEvent(form: FormGroup): boolean {
        if (!form.valid) {
            return false;
        }

        form.controls.Members.value.pop();

        let event = form.value;
        if (event.Group.Id === null) {
            event.Group = null;
        }

        // // hack until I add a wrapper componennt for the time picker
        let startTime = form.get('StartTime').value;
        let endTime = form.get('EndTime').value;
        event.StartTime = moment(startTime).format(TIME_FORMAT);
        event.EndTime = moment(endTime).format(TIME_FORMAT);

        event.StartDate = moment(event.StartDate).format(DATE_FORMAT);
        event.EndDate = moment(event.EndDate).format(DATE_FORMAT);

        this.eventService.CreateEvent(event).then(() => {
            this.router.navigate(['/dashboard']);
            return;
        });

        return true;
    }
}
