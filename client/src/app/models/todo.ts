export interface ApiTodo {
    Id?: number;
    Title: string;
    Description?: string;
    Date: Date;
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
