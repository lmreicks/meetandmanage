import * as moment from 'moment';

/**
 * Date object that gets passed around the front end, mostly for display purposes
 */
export interface DateObject {
    /** moment of the date */
    moment: moment.Moment;
    /** Whether or not this date is today */
    current?: boolean;
    /** Display string for the date */
    display?: string;
    display1?: string;
    /** if this day is in the next month */
    future?: boolean;
    /** If this day is in last month */
    past?: boolean;
    /** Current day we are looking at */
    active?: boolean;
}
