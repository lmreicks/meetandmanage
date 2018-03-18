import { ApiUser } from './user';
import { ApiEvent } from './event';
import { ApiGroup } from './group';

export interface PayloadModel {
    User: ApiUser;
    Groups: ApiGroup[];
    Events: ApiEvent[];
}
