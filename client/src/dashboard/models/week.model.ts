import { Day } from './day.model';

/**
 * Week model that holds whether this is the current week and all the days of the week
 */
export interface Week {
    /** Array of day objects */
    days: Day[];
    /** Whether this is the current week we are on */
    current: boolean;
}

/**
 * Days of the week display strings
 */
export const WeekDays: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];
