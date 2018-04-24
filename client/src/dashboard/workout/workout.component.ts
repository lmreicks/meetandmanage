import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import * as moment from 'moment';
import { WorkoutListService } from './workout.service';
import { ApiWorkout, Workout } from '../../app/models/workout';
import { FormBuilder, FormArray, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
    selector: 'workout-list',
    templateUrl: 'workout.component.html',
    styleUrls: ['workout.component.less']
})

/**
 * workout view that allows the user to record daily tasks they'd like to complete
 */
export class WorkoutListComponent {
    @Input('workouts') workouts: ApiWorkout[] = [];
    public date: moment.Moment;
    public newWorkout: ApiWorkout;

    constructor(private workoutService: WorkoutListService,
                private dashboardService: DashboardService) {
                    this.dashboardService.current.subscribe(date => {
                        this.date = date;
                        this.newWorkout = Workout(date.toDate());
                        console.log(this.newWorkout);
                    });
                }

    /**
     * allows the user to add a workout to their list
     */
    addWorkout(form: NgForm): void {
        this.workouts.push(this.newWorkout);
        this.workoutService.addWorkout(this.newWorkout);
        form.form.markAsPristine();
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
