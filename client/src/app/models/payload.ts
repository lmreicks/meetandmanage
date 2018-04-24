import { ApiUser } from './user';
import { ApiEvent } from './event';
import { ApiGroup } from './group';
import { ApiTodo } from './todo';
import { ApiWorkout } from './workout';

export interface PayloadModel {
    /**
     * Current user
     */
    User: ApiUser;
    /**
     * List of groups that current user has access to
     */
    Groups: ApiGroup[];
    /**
     * List of events that current user has access to
     */
    Events: ApiEvent[];
    /**
     * List of todos for current user
     */
    Todos: ApiTodo[];
    /**
     * List of workoutss for current user
     */
    Workouts: ApiWorkout[];
}
