export interface ApiWorkout {
    /**
     * Id of workout
     */
    Id?: number;
    /**
     * Name of workout
     */
    Name: string;
    /**
     * Amount of sets performed
     */
    Sets: number;
    /**
     * Date of workout
     */
    Date: Date;
    /**
     * Amount of reps performed
     */
    Reps: number;
    /**
     * Amount of weight lifted
     */
    Weight: number;
}

export function Workout(date: Date): ApiWorkout {
    return {
        Name: "",
        Sets: 0,
        Reps: 0,
        Weight: 0,
        Date: date
    };
}
