import { DateObject } from "./date.model";
import { ApiEvent } from "../../app/models/event";

export interface Day {
    day: DateObject;
    events: ApiEvent[];
}
