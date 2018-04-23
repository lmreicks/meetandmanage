import { ApiEvent } from './event';
import { ApiGroup } from './group';
import { PayloadModel } from './payload';
import * as moment from 'moment';
import { DATE_FORMAT, TIME_FORMAT } from '../../constants.module';
import { ApiUser } from './user';
import { ApiTodo } from './todo';
import { Colors } from './colors';

const locations: string[] = [
    '1109 South 2nd Street, Ames, IA 50010', 'Carver 0001',
    'Work', 'Coover 3043', 'Airport Road', 'Home'
];
const titles: string[] = [
    'Doctors Appointment', '230 Class', '309 Meeting', 'Work', 'Digital Women Meeting',
    'IEEE Meeting'
];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function setStartAndEnd(event): { start: string, end: string } {
    let s = moment().clone();
    s.add(getRandomInt(-10, 10), 'days');
    s.set('hours', getRandomInt(0, 18));
    s.set('minutes', getRandomInt(0, 59));

    let e = s.clone();
    e.add(getRandomInt(1, 3), 'hours');
    e.add(getRandomInt(0, 59), 'minutes');

    event.Start = s.toISOString();
    event.End = e.toISOString();

    return { start: event.Start, end: event.End };
}

export const MockEvents: ApiEvent[] = [];

export function generateEvents(): ApiEvent[] {
    for (let i = 0; i < 20; i++) {
        let event: ApiEvent = {
            Id: 1,
            Title: titles[getRandomInt(0, titles.length)],
            Location: locations[getRandomInt(0, locations.length)],
            OwnerId: 3,
            Start: moment().toISOString(),
            End: moment().toISOString(),
            Members: []
        };

        let sande = setStartAndEnd(event);
        event.Start = sande.start;
        event.End = sande.end;

        MockEvents.push(event);
    }
    return MockEvents;
}


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

