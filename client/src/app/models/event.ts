import { Moment } from "moment";
import { NgbTime } from "@ng-bootstrap/ng-bootstrap/timepicker/ngb-time";

export interface ApiCreateEvent {
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
    StartTime: string;
    /**
     * Time of day that the event should end
     */
    EndTime: string;
    /**
     * Date of the event (start date)
     */
    StartDate: string;
    /**
     * End date
     */
    EndDate?: string;
    /** 
     * Either basic location or address
     */
    Location?: string;
    /**
     * Notes or description of the event
     */
    Notes?: string;
    /**
     * List of member's emails who are invited to the event
     */
    Members: number[];
    /**
     * How many minutes before the event that the user should be notifed
     */
    Notification?: number;
    /**
     * Id of the group(s) that this event should belong to, if in a group
     */
    GroupId?: number | number[];

    Recurring?: Recurring;
}

export interface ApiEvent extends ApiCreateEvent {
    /**
     * Id of the event
     */
    Id: number;
}

export interface Recurring {
    /**
     * Binary number that maps to days of the week that it should be recurring
     * ex) 0101101, maps to every monday, wednesday, thursday, saturday
     */
    Days: number;
    RepeatWeekly: number;
}
