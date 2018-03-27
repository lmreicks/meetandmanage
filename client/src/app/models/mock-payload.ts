import { ApiEvent } from './event';
import { ApiGroup } from './group';
import { PayloadModel } from './payload';
import * as moment from 'moment';
import { DATE_FORMAT, TIME_FORMAT } from '../../constants.module';
import { ApiUser } from './user';
import { ApiTodo } from './todo';

export const MockEvents: ApiEvent[] = [
    {
        Id: 1,
        Title: 'Doctors Appointment',
        Location: '1109 South 2nd Street, Ames, IA 50010',
        OwnerId: 3,
        StartDate: moment().format(DATE_FORMAT),
        EndDate: moment().format(DATE_FORMAT),
        StartTime: '10:30:00',
        EndTime: '11:30:00',
        Notes: 'Bring insurance card',
        Members: []
    },
    {
        Id: 2,
        Title: '309 Meeting',
        Location: 'TLA',
        OwnerId: 3,
        StartDate: moment().format(DATE_FORMAT),
        EndDate: moment().format(DATE_FORMAT),
        StartTime: '15:00:00',
        EndTime: '16:00:00',
        Color: '#9C0D38',
        Members: []
    },
    {
        Id: 3,
        Title: '230 Class',
        Location: 'Carver 0001',
        OwnerId: 3,
        StartDate: moment().subtract(7, 'days').format(DATE_FORMAT),
        EndDate: moment().subtract(7, 'days').format(DATE_FORMAT),
        StartTime: '12:00:00',
        EndTime: '13:00:00',
        Color: '#CE5374',
        Members: []
    },
    {
        Id: 4,
        Title: '230 Class',
        Location: 'Carver 0001',
        OwnerId: 3,
        StartDate: moment().subtract(3, 'days').format(DATE_FORMAT),
        EndDate: moment().subtract(3, 'days').format(DATE_FORMAT),
        StartTime: '12:00:00',
        EndTime: '13:00:00',
        Color: '#DBBBF5',
        Members: []
    },
    {
        Id: 5,
        Title: '230 Class',
        Location: 'Carver 0001',
        OwnerId: 3,
        StartDate: moment().add(3, 'days').format(DATE_FORMAT),
        EndDate: moment().add(3, 'days').format(DATE_FORMAT),
        StartTime: '12:00:00',
        EndTime: '13:00:00',
        Color: '#DBBBF5',
        Members: []
    },
    {
        Id: 6,
        Title: '230 Class',
        Location: 'Carver 0001',
        OwnerId: 3,
        StartDate: moment().add(6, 'days').format(DATE_FORMAT),
        EndDate: moment().add(6, 'days').format(DATE_FORMAT),
        StartTime: '12:00:00',
        EndTime: '13:00:00',
        Color: "#731DD8",
        Members: []
    },
    {
        Id: 7,
        Title: 'Digital Women Meeting',
        Location: 'Coover 3043',
        OwnerId: 3,
        StartDate: moment().add(9, 'days').format(DATE_FORMAT),
        EndDate: moment().add(9, 'days').format(DATE_FORMAT),
        StartTime: '15:00:00',
        EndTime: '16:00:00',
        Color: "#577399",
        Members: []
    },
    {
        Id: 8,
        Title: 'IEEE Meeting',
        Location: 'Coover 2001',
        OwnerId: 3,
        StartDate: moment().add(9, 'days').format(DATE_FORMAT),
        EndDate: moment().add(9, 'days').format(DATE_FORMAT),
        StartTime: '10:00:00',
        EndTime: '11:00:00',
        Color: '#006992',
        Members: []
    },
    {
        Id: 9,
        Title: 'Spring Break',
        Location: 'Home',
        OwnerId: 3,
        StartDate: moment().add(14, 'days').format(DATE_FORMAT),
        EndDate: moment().add(14, 'days').format(DATE_FORMAT),
        StartTime: '01:00:00',
        EndTime: '23:00:00',
        Color: '#4286f4',
        Members: []
    },
    {
        Id: 10,
        Title: 'Work',
        Location: 'Airport Road',
        OwnerId: 3,
        StartDate: moment().add(20, 'days').format(DATE_FORMAT),
        EndDate: moment().add(20, 'days').format(DATE_FORMAT),
        StartTime: '10:00:00',
        EndTime: '13:00:00',
        Members: []
    }
];

export const MockUser: ApiUser = {
    Id: 3,
    Email: 'lmreicks@iastate.edu',
    Name: 'Lexi Reicks'
};

export const MockGroups: ApiGroup[] = [];

export const MockTodos: ApiTodo[] = [];

export const MockPayload: PayloadModel = {
    User: MockUser,
    Events: MockEvents,
    Groups: MockGroups,
    Todo: MockTodos
};

