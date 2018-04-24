import { Injectable} from '@angular/core';
import { Http } from '@angular/http';
import { API_ROOT } from '../../constants.module';
import { ApiGroupMember, ApiGroup } from '../models/group';
import { ApiUser } from '../models/user';

@Injectable()

export class GroupMemberService {
    private baseurl: string = API_ROOT + '/group/';
    constructor(private http: Http) {}

    GetMembers(group: ApiGroup): Promise<ApiGroupMember[]> {
        return this.http.get(this.baseurl + group.Id + '/member')
                .map(res => res.json())
                .toPromise();
    }

    GetMember(group: ApiGroup, user: ApiUser): Promise<ApiGroupMember> {
        return this.http.get(this.baseurl + group.Id + '/member/' + user.Id)
                .map(res => res.json())
                .toPromise();
    }

    AddMember(group: ApiGroup, member: ApiGroupMember): Promise<ApiGroupMember> {
        return this.http.post(this.baseurl + group.Id + '/member', member)
                .map(res => res.json())
                .toPromise();
    }

    UpdateMemberPermission(group: ApiGroup, member: ApiGroupMember): Promise<ApiGroupMember> {
        return this.http.put(this.baseurl + group.Id + '/member/' + member.User.Id, member)
                .map(res => res.json())
                .toPromise();
    }

    DeleteMember(group: ApiGroup, member: ApiGroupMember): Promise<ApiGroupMember> {
        return this.http.delete(this.baseurl + group.Id + '/member/' + member.User.Id)
                .map(res => res.json())
                .toPromise();
    }
}
