import { Component } from '@angular/core';
import { ApiTodo, Todo } from '../../app/models/todo';
import { TodoListService } from './todo-list.service';
import { DashboardService } from '../dashboard.service';
import * as moment from 'moment';

@Component({
    selector: 'todo-list',
    templateUrl: 'todo-list.component.html',
    styleUrls: ['todo-list.component.less']
})

export class TodoListComponent {
    public newTodo: ApiTodo;
    public date: moment.Moment;

    public todos: ApiTodo[] = [];

    constructor(private todoService: TodoListService,
                private dashboardService: DashboardService) {
                    this.dashboardService.current.subscribe(date => {
                        this.date = date;
                        this.newTodo = Todo(date.toDate());
                    });
                }

    addTodo(): void {
        this.todos.push(this.newTodo);
        this.todoService.addTodo(this.newTodo);
        this.newTodo = Todo(this.date.toDate());
    }

    removeTodo(todo: ApiTodo): void {
        let index = this.todos.indexOf(todo);
        if (index > -1) {
            this.todos.splice(index, 1);
            this.todoService.removeTodo(todo);
        }
    }
}
