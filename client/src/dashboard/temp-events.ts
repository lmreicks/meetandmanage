import { ApiEvent } from '../app/models';
import * as moment from 'moment';
import { NgbTime } from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';

export const mockEvent: ApiEvent = {
    Id: 1,
    OwnerId: 1,
    Title: 'Meeting',
    StartTime: new NgbTime(11, 30),
    EndTime: new NgbTime(12, 30),
    StartDate: moment().subtract(3, 'days'),
    EndDate: moment().subtract(3, 'days'),
    Members: ['lmreicks@iastate.edu']
};
