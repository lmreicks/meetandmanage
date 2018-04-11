import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiTodo } from '../../app/models/todo';
import { API_ROOT } from '../../constants.module';

@Injectable()

export class TodoListService {
    constructor(private http: Http) {}

    addTodo(todo: ApiTodo): Promise<ApiTodo> {
        return this.http.post(API_ROOT + '/todo', todo)
            .map(res => res.json())
            .toPromise();
    }

    removeTodo(todo: ApiTodo): Promise<void> {
        return this.http.delete(API_ROOT + '/todo/' + todo.Id)
            .map(res => res.json())
            .toPromise();
    }

    updateTodo(todo: ApiTodo): Promise<ApiTodo> {
        return this.http.put(API_ROOT + '/todo/' + todo.Id, todo)
            .map(res => res.json())
            .toPromise();
    }

    getTodo(id: number): Promise<ApiTodo> {
        return this.http.get(API_ROOT + '/todo/' + id)
            .map(res => res.json())
            .toPromise();
    }

    getTodos(): Promise<ApiTodo[]> {
        return this.http.get(API_ROOT + '/todo')
            .map(res => res.json())
            .toPromise();
    }
}
