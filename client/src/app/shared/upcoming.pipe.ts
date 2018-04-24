import { Pipe, PipeTransform, Injectable } from "@angular/core";
import { ApiEvent } from "../models/event";
import * as moment from 'moment';
import { defaultUrlMatcher } from "@angular/router/src/shared";

@Pipe({
  name: 'upcoming',
  pure: false
})
@Injectable()
export class UpcomingFilter implements PipeTransform {

  /**
   * @param events object from array
   * @param granularity month, week, day
   */
  transform(events: any, granularity: string): any {
    if (!granularity || !events) return events;

    return UpcomingFilter.filter(events, granularity);
  }

  /**
   * 
   * @param items List of items to filter
   * @param term  a string term to compare with every property of the list
   * 
   */
  static filter(events: ApiEvent[], granularity: string): ApiEvent[] {
    let upcomingEvents = [];
    events.forEach(event => {
        let now = moment().clone();
        let start = moment(event.Start);
        let before = now.clone();

        switch (granularity) {
            case 'Today':
                before.add(1, 'day');
            break;
            case 'Next Week':
                before.add(7, 'days');
            break;
            default:
                before.add(30, 'days');
            break;
        }
        if (start.isSameOrAfter(now) && start.isSameOrBefore(before)) {
            upcomingEvents.push(event);
        }
    });

    if (upcomingEvents.length === 0) {
        upcomingEvents = [-1];
    }

    return upcomingEvents;
  }
}
