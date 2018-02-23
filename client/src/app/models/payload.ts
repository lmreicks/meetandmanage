import { ApiUser } from "./user";
import { ApiEvent } from "./event";

export interface PayloadModel {
    User: ApiUser;
    Events: ApiEvent[];
}
