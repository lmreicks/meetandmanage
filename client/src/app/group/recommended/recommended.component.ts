import { Component } from '@angular/core';
import { ApiGroup, ApiGroupMember, GroupPermission } from '../../models/group';
import { RecommendedService } from './recommended.service';
import { darken } from '../groups.component';
import { GroupMemberService } from '../group-member.service';
import { CoreCacheService } from '../../services/core-cache.service';
import { ApiUser } from '../../models/user';

@Component({
    selector: 'recommended',
    templateUrl: 'recommended.component.html',
    styleUrls: ['recommended.component.less']
})

export class RecommendedComponent {
    public recommendedGroups: ApiGroup[];
    public user: ApiUser;
    public darken = darken;

    constructor(private recService: RecommendedService,
                private groupMemberService: GroupMemberService,
                private coreCache: CoreCacheService) {}

    ngOnInit(): void {
        this.recService.GetAll().then(recGroups => this.recommendedGroups = recGroups);
        this.coreCache.GetCurrentUser().then(user => this.user = user);
    }

    addMember(group: ApiGroup) {
        let groupMember: ApiGroupMember = {
            User: this.user,
            Permission: GroupPermission.Member
        };
        this.groupMemberService.AddMember(group, groupMember).then(res => {
            let index = this.recommendedGroups.indexOf(group);
            this.recommendedGroups.splice(index, 1);
        });
    }
}
