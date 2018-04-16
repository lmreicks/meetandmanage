import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoreCacheService } from '../../app/services/core-cache.service';
import { ApiGroup } from '../../app/models/group';

@Component({
    selector: 'mnm-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.less']
})

/**
 * Side menu that contains the minicalendar, displays current groups, and lets the user create new groups
 */
export class SidebarComponent {
    public groups: ApiGroup[];
    public isOpen: boolean = true;
    constructor(private router: Router,
                private coreCache: CoreCacheService) {}

    /**
     * On init of this component, we want to the the users group information.
     */
    ngOnInit(): void {
        this.coreCache.GetGroups().then(groups => this.groups = groups);
    }

    /**
     * routes the user to the create group page
     */
    public newGroup(): void {
        this.router.navigate(['group/create']);
    }

    /**
     * allows the user to turn on/off events for a given group
     * @param group the given group
     */
    public filterGroup(group: ApiGroup): void {
        group.ShowEvents = !group.ShowEvents;
        this.coreCache.FilterEventsByGroup(group);
    }

    /**
     * a functionality that allows a user to toggle the side group panel on/off
     */
    public togglePanel(): boolean {
        this.isOpen = !this.isOpen;
        return this.isOpen;
    }
}
