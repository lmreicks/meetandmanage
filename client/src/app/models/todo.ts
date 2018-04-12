export interface ApiTodo {
    /**
     * Id of todo
     */
    Id?: number;
    /**
     * Title of todo
     */
    Title: string;
    /**
     * Description
     */
    Description?: string;
    /**
     * Todos are only displayed on a certain day
     */
    Date: Date;
    /**
     * Whether or not this todo is done
     */
    Done: boolean;
}

export function Todo(date: Date): ApiTodo {
    return {
        Title: "",
        Description: "",
        Done: false,
        Date: date
    };
}
