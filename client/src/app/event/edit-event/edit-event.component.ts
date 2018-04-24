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
import { ApiGroup, GroupPermission } from '../../models/group';
import { PermissionService } from '../../services/permission.service';

@Component({
    selector: 'mnm-edit-event',
    templateUrl: 'edit-event.component.html',
    styleUrls: ['edit-event.component.less']
})

/**
 * Editing and creating events
 */
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
                private permission: PermissionService,
                private fb: FormBuilder) {}

    /**
     * Oninit we want to get all users, groups, and the event if we are editing it
     * Then we create a the form
     */
    ngOnInit(): void {
        this.userService.GetAll().then(users => this.users = users);
        this.coreCache.GetGroups().then(groups => this.groups = groups);

        this.route.params.subscribe(params => {
            if (params.id === 'create') {
                let createEvent: ApiCreateEvent = {
                    Title: null,
                    OwnerId: 3, // change this!!
                    Start: moment().toLocaleString(),
                    End: moment().toLocaleString(),
                    Location: "", Color: "", Notes: "", Members: []
                };
                this.eventForm = this.eventService.BuildEventForm(createEvent, this.eventForm);
            } else {
                this.edit = true;
                this.eventService
                    .GetEventById(+params.id)
                    .then(event => {
                        if (event.GroupId) {
                            this.coreCache.GetGroupById(event.GroupId)
                                .then(group => {
                                    if (this.permission.GetPermission(group) < GroupPermission.Manager) {
                                        this.router.navigate(['dashboard']);
                                    } else {
                                        this.eventForm = this.eventService.BuildEventForm(event, this.eventForm);
                                    }
                                });
                        } else {
                            this.eventForm = this.eventService.BuildEventForm(event, this.eventForm);
                        }
                    });
            }
        });
    }

    /**
     * Takes in a date object and formats it to the correct display format
     * @param {Date} date
     * @returns {string} formated date to display
     */
    public formatDate(date: Date): string {
        return moment(date).format('dddd, MMMM Do YYYY');
    }

    /**
     * Sets color on the form using the dropdown menu
     * @param {string} color 
     */
    public setColor(color: string): void {
        this.eventForm.get('Color').setValue(color);
    }

    /**
     * Sets notification granualirty on the form
     * @param {NotificationGranularity} granularity 
     */
    public setNotification(granularity: NotificationGranularity): void {
        this.eventForm.get('NotificationGranularity').setValue(granularity);
    }

    /**
     * Gets the notification granularity's 'nice' name
     */
    public getNotificationGranularity(): string {
        let value = +this.eventForm.get('NotificationGranularity').value;
        return this.notificationGranularity[value];
    }

    /**
     * Removes a notification
     */
    public removeNotification(): void {
        this.eventForm.get('NotificationGranularity').setValue(null);
        this.eventForm.get('NotificationValue').setValue(null);
        this.showNotification = false;
    }

    /**
     * Gets the form array of member controls
     *  --- work around for aot compiling ---
     */
    public getMembers(): AbstractControl[] {
        let arr = <FormArray>this.eventForm.controls.Members;
        return arr.controls;
    }

    /**
     * Adds a new member control
     */
    public addMember(): void {
        let arr: FormArray = <FormArray>this.eventForm.controls.Members;

        // add new form control
        arr.push(this.fb.group({
            Id: null,
            Name: '',
            Email: ''
        }));
    }

    /**
     * Removes member form control at a certain index
     * @param {number} index
     */
    public removeMember(index: number): void {
        let arr: FormArray = <FormArray>this.eventForm.controls.Members;

        arr.removeAt(index);
    }

    /**
     * Extra checks for validity before submitting and attempting to create/update the event
     * @param {FormGroup} form 
     */
    public createEvent(form: FormGroup): boolean {
        if (!form.valid) {
            return false;
        }

        form.controls.Members.value.pop();

        let event = form.value;
        if (event.Group.Id === null) {
            event.Group = null;
        }

        let startTime = form.get('StartTime').value;
        let endTime = form.get('EndTime').value;
        event.StartTime = moment(startTime).format(TIME_FORMAT);
        event.EndTime = moment(endTime).format(TIME_FORMAT);

        event.StartDate = moment(event.StartDate).format(DATE_FORMAT);
        event.EndDate = moment(event.EndDate).format(DATE_FORMAT);

        this.eventService.CreateEvent(event).then(() => {
            this.router.navigate(['/dashboard']);
        }, err => this.router.navigate['/dashboard']);

        return true;
    }
}
