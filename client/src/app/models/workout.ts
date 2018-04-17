export interface ApiWorkout {
    /**
     * Id of workout
     */
    Id?: number;
    /**
     * Title of workout
     */
    Title: string;
    /**
     * Description
     */
    Description?: string;
    /**
     * Workouts are only displayed on a certain day
     */
    Date: Date;
    /**
     * Whether or not this workout is done
     */
    Done: boolean;
}

export function Workout(date: Date): ApiWorkout {
    return {
        Title: "",
        Description: "",
        Done: false,
        Date: date
    };
}
