import { Day } from './day.model';

export interface Week {
    days: Day[];
    current: boolean;
}

export const WeekDays: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];
