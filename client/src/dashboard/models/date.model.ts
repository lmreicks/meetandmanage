export interface DateObject {
    utcDateValue: number;
    current?: boolean;
    display?: string;
    future?: boolean;
    past?: boolean;
}

export const DATE_FORMAT: string = 'YYYY-MM-DD';
export const TIME_FORMAT: string = 'h:mm:ss';
