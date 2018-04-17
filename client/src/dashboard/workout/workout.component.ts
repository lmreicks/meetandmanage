import { Component } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import * as moment from 'moment';
import { WorkoutListService } from './workout.service';
import { ApiWorkout, Workout } from '../../app/models/workout';

@Component({
    selector: 'workout-list',
    templateUrl: 'workout.component.html',
    styleUrls: ['workout.component.less']
})

/**
 * workout view that allows the user to record daily tasks they'd like to complete
 */
export class WorkoutListComponent {
    public newWorkout: ApiWorkout;
    public date: moment.Moment;

    public workouts: ApiWorkout[] = [];

    constructor(private workoutService: WorkoutListService,
                private dashboardService: DashboardService) {
                    this.dashboardService.current.subscribe(date => {
                        this.date = date;
                        this.newWorkout = Workout(date.toDate());
                    });
                }

    /**
     * allows the user to add a workout to their list
     */
    addWorkout(): void {
        this.workouts.push(this.newWorkout);
        this.workoutService.addWorkout(this.newWorkout);
        this.newWorkout = Workout(this.date.toDate());
    }

    /**
     * allows the user to remove a given workout from their list
     * @param workout the given workout item
     */
    removeWorkout(workout: ApiWorkout): void {
        let index = this.workouts.indexOf(workout);
        if (index > -1) {
            this.workouts.splice(index, 1);
            this.workoutService.removeWorkout(workout);
        }
    }
}
