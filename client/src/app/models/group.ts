import { ApiUser } from './user';
import { ApiEvent } from './event';

export interface ApiCreateGroup {
    /**
     * Name of the group
     */
    Name: string;
    /**
     * Description of the group
     */
    Description?: string;
    /**
     * List of members that belong to the group
     */
    Members: ApiUser[];
}

export interface ApiGroup extends ApiCreateGroup {
    /**
     * Id of the created group
     */
    Id: number;
    /**
     * Events the belong to the group
     */
    Events: ApiEvent[];
    /**
     * Whether or not we should show this groups events
     */
    ShowEvents?: boolean;
}
