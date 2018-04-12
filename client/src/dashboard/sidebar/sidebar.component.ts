import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoreCacheService } from '../../app/services/core-cache.service';
import { ApiGroup } from '../../app/models/group';

@Component({
    selector: 'mnm-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.less']
})

export class SidebarComponent {
    public groups: ApiGroup[];
    public isOpen: boolean = true;
    constructor(private router: Router,
                private coreCache: CoreCacheService) {}

    ngOnInit(): void {
        this.coreCache.GetGroups().then(groups => this.groups = groups);
    }

    public newGroup(): void {
        this.router.navigate(['group/create']);
    }

    public filterGroup(group: ApiGroup): void {
        group.ShowEvents = !group.ShowEvents;
        this.coreCache.FilterEventsByGroup(group);
    }

    public togglePanel(): boolean {
        this.isOpen = !this.isOpen;
        return this.isOpen;
    }
}
