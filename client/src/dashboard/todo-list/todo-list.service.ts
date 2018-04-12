import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiTodo } from '../../app/models/todo';
import { API_ROOT } from '../../constants.module';

@Injectable()

/**
 * CRUD+ Service for Todo List
 */
export class TodoListService {
    constructor(private http: Http) {}

    /**
     * Create a new todo
     * @param {ApiTodo} todo 
     */
    addTodo(todo: ApiTodo): Promise<ApiTodo> {
        return this.http.post(API_ROOT + '/todo', todo)
            .map(res => res.json())
            .toPromise();
    }

    /**
     * Delete a todo on the server
     * @param todo 
     */
    removeTodo(todo: ApiTodo): Promise<void> {
        return this.http.delete(API_ROOT + '/todo/' + todo.Id)
            .map(res => res.json())
            .toPromise();
    }

    /**
     * Updates the todo on the server
     * @param todo
     */
    updateTodo(todo: ApiTodo): Promise<ApiTodo> {
        return this.http.put(API_ROOT + '/todo/' + todo.Id, todo)
            .map(res => res.json())
            .toPromise();
    }

    /**
     * Gets a todo from the server
     * @param id
     */
    getTodo(id: number): Promise<ApiTodo> {
        return this.http.get(API_ROOT + '/todo/' + id)
            .map(res => res.json())
            .toPromise();
    }

    /**
     * Gets all the todos from the server
     */
    getTodos(): Promise<ApiTodo[]> {
        return this.http.get(API_ROOT + '/todo')
            .map(res => res.json())
            .toPromise();
    }
}
