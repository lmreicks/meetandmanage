import { Moment } from "moment";
import { NgbTime } from "@ng-bootstrap/ng-bootstrap/timepicker/ngb-time";

export interface ApiEvent {
    /**
     * Id of the event
     */
    Id: number;
    /**
     * Title ex) Doctors Appointment
     */
    Title: string;
    /**
     * Id of the member that made the event
     */
    OwnerId: number;
    /**
     * Time of day that the event should start
     */
    StartTime: NgbTime;
    /**
     * Time of day that the event should end
     */
    EndTime: NgbTime;
    /**
     * Date that event should start
     */
    StartDate: Moment;
    /**
     * Date that event should end (same as start if only one event)
     */
    EndDate: Moment;
    /**
     * Notes or description of the event
     */
    Description?: string;
    /**
     * List of member's emails who are invited to the event
     */
    Members: string[];
    /**
     * How many minutes before the event that the user should be notifed
     */
    Notification?: number;
    /**
     * Id of the group(s) that this event should belong to, if in a group
     */
    GroupId?: number | number[];
}
