import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'mnm-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.less']
})

export class SidebarComponent {
    constructor(private router: Router) {}

    public newGroup(): void {
        this.router.navigate(['group/create']);
    }
}
