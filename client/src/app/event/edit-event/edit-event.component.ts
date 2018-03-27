import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, AbstractControl, FormArray, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { EventService } from '../event.service';
import { ApiEvent, ApiCreateEvent, NotificationGranularity } from '../../models/event';
import { TIME_FORMAT, DATE_FORMAT } from '../../../constants.module';
import { Colors } from '../../models/colors';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUser } from '../../models/user';
import { UserService } from '../../user/user.service';

@Component({
    selector: 'mnm-edit-event',
    templateUrl: 'edit-event.component.html',
    styleUrls: ['edit-event.component.less']
})

export class EditEventComponent {
    @ViewChild('memberDropdown')
    public memberDropdown: ElementRef;
    public edit: boolean = false;
    public event: ApiEvent | ApiCreateEvent;
    public eventForm: FormGroup;
    public colors: string[] = Colors;
    public notificationGranularity = NotificationGranularity;
    public showNotification: boolean = true;
    public memberNotFound: boolean = false;
    public users: ApiUser[];

    constructor(private route: ActivatedRoute,
                private router: Router,
                private eventService: EventService,
                private userService: UserService) {}

    ngOnInit(): void {

        this.userService.GetAll().then(users => {
            this.users = users;
        });

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

    public memberSearch(): void {
        let el = this.memberDropdown.nativeElement;
        if (el.children.length === 0) {
            this.memberNotFound = true;
        } else if (el.children.length === 1 && el.children[0].id === "not-found") {
            this.memberNotFound = true;
        } else {
            this.memberNotFound = false;
        }
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

    public getMember(i: number): string {
        return (<FormArray>this.eventForm.get('Members')).get(i + "").value;
    }

    public getMembers(): AbstractControl[] {
        let arr = <FormArray>this.eventForm.controls.Members;
        return arr.controls;
    }

    public addMember(user: ApiUser, index: number): void {
        let arr: FormArray = <FormArray>this.eventForm.controls.Members;
        arr.get(index + '').setValue(user.Email);

        // add new form control
        arr.push(new FormControl(''));
    }

    public removeMember(index: number): void {
        let arr: FormArray = <FormArray>this.eventForm.controls.Members;

        arr.removeAt(index);
    }

    public createEvent(form: FormGroup): boolean {
        if (!form.valid) {
            return false;
        }

        let event = form.value;

        let members = [];
        this.getMembers().forEach(memberC => {
            let index = this.users.map(x => x.Email).indexOf(memberC.value);
            if (index > -1) {
                members.push(this.users[index].Id);
            }
        });

        event.Members = members;

        // hack until I add a wrapper componennt for the time picker
        let startTime = form.get('StartTime').value;
        let endTime = form.get('EndTime').value;
        event.StartTime = startTime.hour + ':' + startTime.minute + ':' + '00';
        event.EndTime = endTime.hour + ':' + endTime.minute + ':' + '00';

        event.StartDate = moment(event.StartDate).format(DATE_FORMAT);
        event.EndDate = moment(event.EndDate).format(DATE_FORMAT);

        this.eventService.CreateEvent(event).then(e => {
            this.router.navigate(['/dashboard']);
        });

        return true;
    }
}
