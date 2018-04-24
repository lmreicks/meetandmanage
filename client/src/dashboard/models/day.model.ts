import { DateObject } from "./date.model";
import { ApiEvent } from "../../app/models/event";
import { ApiTodo } from "../../app/models/todo";

/**
 * Used to save the day's date object and the day's events
 */
export interface Day {
    day: DateObject;
    events: ApiEvent[];
    todos?: ApiTodo[];
}
