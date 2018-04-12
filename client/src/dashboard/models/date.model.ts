import * as moment from 'moment';

export interface DateObject {
    moment: moment.Moment;
    current?: boolean;
    display?: string;
    display1?: string;
    future?: boolean;
    past?: boolean;
    active?: boolean;
}
