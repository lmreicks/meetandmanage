import { ApiEvent } from './event';
import { ApiGroup, GroupPermission } from './group';
import { PayloadModel } from './payload';
import * as moment from 'moment';
import { DATE_FORMAT, TIME_FORMAT } from '../../constants.module';
import { ApiUser } from './user';
import { ApiTodo } from './todo';
import { Colors } from './colors';

const lexi: ApiUser = {
    Id: 2,
    Name: 'Lexi Reicks',
    Email: 'lmreicks@iastate.edu'
};

const trevin: ApiUser = {
    Id: 1,
    Name: 'Trevin Nance',
    Email: 'tnance@iastate.edu'
};

const bailey: ApiUser = {
    Id: 3,
    Name: 'Bailey Jensen',
    Email: 'bmjensen@iastate.edu'
};

const ann: ApiUser = {
    Id: 4,
    Name: 'Ann Gould',
    Email: 'anngould@iastate.edu'
};

export const MockGroups: ApiGroup[] = [
    {
        Id: 1,
        Name: 'Group 1',
        Description: 'This is a group',
        Image: 'https://help.github.com/assets/images/help/profile/identicon.png',
        Color: Colors[0],
        Events: [],
        Members: [
            { User: lexi, Permission: GroupPermission.Owner },
            { User: trevin, Permission: GroupPermission.Manager },
            { User: bailey, Permission: GroupPermission.Member },
            { User: ann, Permission: GroupPermission.Member }
        ]
    },
    {
        Id: 2,
        Name: 'Group 2',
        Description: 'THis is also a group',
        Color: Colors[1],
        Events: [],
        Members: [
            { User: trevin, Permission: GroupPermission.Owner },
            { User: bailey, Permission: GroupPermission.Manager },
            { User: ann, Permission: GroupPermission.Manager },
            { User: lexi, Permission: GroupPermission.Member }
        ]
    }
];

const locations: string[] = [
    '1109 South 2nd Street, Ames, IA 50010', 'Carver 0001',
    'Work', 'Coover 3043', 'Airport Road', 'Home'
];
const titles: string[] = [
    'Doctors Appointment', '230 Class', '309 Meeting', 'Work', 'Digital Women Meeting',
    'IEEE Meeting'
];

export function getRandomInt(min, max) {
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
    event.Color = Colors[getRandomInt(0, Colors.length)];

    return { start: event.Start, end: event.End };
}

export const MockEvents: ApiEvent[] = [];

export function generateEvents(): ApiEvent[] {
    for (let i = 0; i < 20; i++) {
        let event: ApiEvent = {
            Id: i,
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

        let group = MockGroups[getRandomInt(0, MockGroups.length)];
        event.GroupId = group.Id;
        group.Events.push(event);
    }
    return MockEvents;
}


export const MockUser: ApiUser = {
    Id: 2,
    Email: 'lmreicks@iastate.edu',
    Name: 'Lexi Reicks'
};

export const MockTodos: ApiTodo[] = [];

export const MockPayload: PayloadModel = {
    User: MockUser,
    Events: MockEvents,
    Groups: MockGroups,
    Todos: MockTodos
};

