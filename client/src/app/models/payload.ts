import { ApiUser } from './user';
import { ApiEvent } from './event';
import { ApiGroup } from './group';
import { ApiTodo } from './todo';

export interface PayloadModel {
    User: ApiUser;
    Groups: ApiGroup[];
    Events: ApiEvent[];
    Todo: ApiTodo[];
}
