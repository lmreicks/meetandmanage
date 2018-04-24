import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { ApiGroup, GroupPermission } from '../models/group';

@Injectable()

export class PermissionService {
    constructor(private session: SessionService) {
        console.log(this.session.currentUserId);
    }

    public GetPermission(group: ApiGroup): GroupPermission {
        let index = group.Members.map(x => x.User.Id).indexOf(this.session.currentUserId);

        if (index > -1) {
            return group.Members[index].Permission;
        }

        return GroupPermission.None;
    }
}
