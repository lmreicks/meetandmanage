import { Component } from '@angular/core';
import { CoreCacheService } from '../../services/core-cache.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiGroup, GroupPermission } from '../../models/group';
import { ApiEvent } from '../../models/event';
import * as moment from 'moment';
import { PermissionService } from '../../services/permission.service';
import { darken } from '../groups.component';

@Component({
    selector: 'group',
    templateUrl: 'group.component.html',
    styleUrls: ['group.component.less']
})

export class GroupComponent {
    public userPermission: GroupPermission;
    public group: ApiGroup;
    public upcomingEvents: ApiEvent[] = [];
    public upcomingGranularity: string = 'Next Week';
    public loading: boolean = true;
    public GroupPermission = GroupPermission;
    public editName: boolean = false;
    public darken = darken;

    constructor(private coreCache: CoreCacheService,
                private route: ActivatedRoute,
                private permission: PermissionService,
                private router: Router) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            if (params.id === 'create') return;
            this.loading = true;
            this.coreCache.GetGroupById(+params.id).then(group => {
                this.userPermission = this.permission.GetPermission(group);
                if (this.userPermission === GroupPermission.None) {
                    this.router.navigate(['dashboard']);
                }
                this.group = group;
                this.coreCache.sortEvents(this.group.Events);
                this.parseEvents();
                this.loading = false;
            });
        });
    }

    private parseEvents(): void {
        this.upcomingEvents = [];
        this.group.Events.forEach(event => {
            let now = moment().clone();
            let start = moment(event.Start);
            let before = now.clone();

            switch (this.upcomingGranularity) {
                case 'Today':
                    before.add(1, 'day');
                break;
                case 'Next Week':
                    before.add(7, 'days');
                break;
                case 'Next Month':
                    before.add(30, 'days');
                break;
            }
            if (start.isSameOrAfter(now) && start.isSameOrBefore(before)) {
                this.upcomingEvents.push(event);
            }
        });
    }

    public toggleEditName(): void {
        this.editName = !this.editName;
    }

    public editEvent($ev: MouseEvent, event: ApiEvent): void {
        this.router.navigate(['event', event.Id]);
    }

    public selectUpcoming(granularity: string) {
        this.upcomingGranularity = granularity;
        this.parseEvents();
    }

    public formatDate(event: ApiEvent): string {
        let start = moment(event.Start);
        let end = moment(event.End);

        let string = start.format('dddd, MMMM Do YYYY, h:mm a - ') + end.format('h:mm a');
        return string;
    }

    public weekBreak(event1: number, event2: number): boolean {
        let startOfWeek = moment().startOf('week');
        if (this.upcomingEvents.length === event2) return;
        if (startOfWeek.isBefore(this.upcomingEvents[event1].Start))
            return true;
        return false;
    }
}
