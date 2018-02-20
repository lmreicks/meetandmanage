export interface DateObject {
    utcDateValue: number;
    current?: boolean;
    display?: string;
    future?: boolean;
    past?: boolean;
}

export const DateFormat: string = 'YYYY-MM-DD';
