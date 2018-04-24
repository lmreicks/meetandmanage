import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from './group.service';
import { ApiGroup } from '../models/group';
import { ApiEvent } from '../models/event';
import * as moment from 'moment';
import { Colors } from '../models/colors';
import { getRandomInt } from '../models/mock-payload';

@Component({
    selector: 'groups',
    templateUrl: 'groups.component.html',
    styleUrls: ['groups.component.less']
})

export class GroupsComponent {
    public groups: ApiGroup[];

    constructor(private groupService: GroupService, private router: Router) {}

    ngOnInit(): void {
        this.groupService.GetAll().then(groups => {
            this.groups = groups;
            this.groups.forEach(group => {
                group.Color = Colors[getRandomInt(0, Colors.length)];
            });

            this.groups.sort((a, b) => {
                if (a.Events.length === b.Events.length) return 0;
                return a.Events.length > b.Events.length ? -1 : 1;
            });
        });
    }

    public editEvent($ev: MouseEvent, event: ApiEvent): void {
        this.router.navigate(['event', event.Id]);
    }

    public formatDate(event: ApiEvent): string {
        let start = moment(event.Start);
        let end = moment(event.End);

        let string = start.format('dddd, MMMM Do YYYY, h:mm a - ') + end.format('h:mm a');
        return string;
    }

    darken(color: string, hue: number): string {
        let usePound = false;

        if (color[0] === "#") {
            color = color.slice(1);
            usePound = true;
        }

        let num = parseInt(color, 16);

        let r = (num >> 16) + hue;

        if (r > 255) {
            r = 255;
        } else if  (r < 0) {
            r = 0;
        }

        let b = ((num >> 8) & 0x00FF) + hue;

        if (b > 255) {
            b = 255;
        } else if  (b < 0) {
            b = 0;
        }

        let g = (num & 0x0000FF) + hue;

        if (g > 255) {
            g = 255;
        } else if (g <= 0) {
            g = 0;
        }

        return (usePound ? "#" : "") + String("000000" + (g | (b << 8) | (r << 16)).toString(16)).slice(-6);
    }
}
