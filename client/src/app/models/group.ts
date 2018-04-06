import { ApiUser } from './user';
import { ApiEvent } from './event';

export interface ApiCreateGroup {
    Name: string;
    Description?: string;
    Members: ApiUser[];
}

export interface ApiGroup extends ApiCreateGroup {
    Id: number;
    Events: ApiEvent[];
    ShowEvents?: boolean;
}
