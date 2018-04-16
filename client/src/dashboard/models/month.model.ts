import { Week } from "./week.model";

/**
 * Used to save the month's display name, weeks, and weekdays for month view
 */
export interface Month {
    /** Display name */
    name: string;
    /** Week array containing array of days */
    weeks: Week[];
    /** All the days of the week */
    weekdays: string[];
}

/**
 * Display String for each month
 */
export const Months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'November',
    'December'
];
