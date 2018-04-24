import { Component } from '@angular/core';
import { ApiGroup } from '../../models/group';
import { RecommendedService } from './recommended.service';

@Component({
    selector: 'recommended',
    templateUrl: 'recommended.component.html',
    styleUrls: ['recommended.component.less']
})

export class RecommendedComponent {
    public recommendedGroups: ApiGroup[];

    constructor(private recService: RecommendedService) {}

    ngOnInit(): void {
        this.recService.GetAll().then(recGroups => this.recommendedGroups = recGroups);
    }
}
