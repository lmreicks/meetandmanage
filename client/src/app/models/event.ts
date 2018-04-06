import { ApiUser } from "./user";
import { ApiGroup } from "./group";

export enum NotificationGranularity {
    Minutes,
    Hours,
    Days,
    Weeks
}

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
     * List of member's who are invited to the event
     */
    Members: ApiUser[];
    /**
     * How many (minutes/hours/days/weeks) before the event that the user should be notifed
     */
    NotificationValue?: number;
    /**
     * Notification granularity (minutes/hours/days/weeks)
     */
    NotificationGranularity?: NotificationGranularity;
    /**
     * group id that this event should belong to, if in a group
     */
    GroupId?: number;
    /**
     * Color of the event in the form of a hash code (#00000)
     */
    Color?: string;

    /**
     * If it should be hidden on the calendar
     */
    Hidden?: boolean;

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
