import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { API_ROOT } from '../../constants.module';
import { ApiWorkout } from '../../app/models/workout';

@Injectable()

/**
 * CRUD+ Service for Workout List
 */
export class WorkoutListService {
    constructor(private http: Http) {}

    /**
     * Create a new workout
     * @param {ApiWorkout} workout 
     */
    addWorkout(workout: ApiWorkout): Promise<ApiWorkout> {
        return this.http.post(API_ROOT + '/workout', workout)
            .map(res => res.json())
            .toPromise();
    }

    /**
     * Delete a workout on the server
     * @param workout 
     */
    removeWorkout(workout: ApiWorkout): Promise<void> {
        return this.http.delete(API_ROOT + '/workout/' + workout.Id)
            .map(res => res.json())
            .toPromise();
    }

    /**
     * Updates the workout on the server
     * @param workout
     */
    updateWorkout(workout: ApiWorkout): Promise<ApiWorkout> {
        return this.http.put(API_ROOT + '/workout/' + workout.Id, workout)
            .map(res => res.json())
            .toPromise();
    }

    /**
     * Gets a workouts from the server
     * @param id
     */
    getWorkout(id: number): Promise<ApiWorkout> {
        return this.http.get(API_ROOT + '/workout/' + id)
            .map(res => res.json())
            .toPromise();
    }

    /**
     * Gets all the workoutss from the server
     */
    getWorkouts(): Promise<ApiWorkout[]> {
        return this.http.get(API_ROOT + '/workout')
            .map(res => res.json())
            .toPromise();
    }
}
