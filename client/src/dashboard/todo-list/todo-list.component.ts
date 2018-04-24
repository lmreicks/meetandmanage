import { Component, Input } from '@angular/core';
import { ApiTodo, Todo } from '../../app/models/todo';
import { TodoListService } from './todo-list.service';
import { DashboardService } from '../dashboard.service';
import * as moment from 'moment';

@Component({
    selector: 'todo-list',
    templateUrl: 'todo-list.component.html',
    styleUrls: ['todo-list.component.less']
})

/**
 * todo view that allows the user to record daily tasks they'd like to complete
 */
export class TodoListComponent {
    @Input('todos') todos: ApiTodo[] = [];
    public newTodo: ApiTodo;
    public date: moment.Moment;

    constructor(private todoService: TodoListService,
                private dashboardService: DashboardService) {
                    this.dashboardService.current.subscribe(date => {
                        this.date = date;
                        this.newTodo = Todo(date.toDate());
                    });
                }

    /**
     * allows the user to add a todo item to their list
     */
    addTodo(): void {
        this.todos.push(this.newTodo);
        this.todoService.addTodo(this.newTodo);
        this.newTodo = Todo(this.date.toDate());
    }

    /**
     * allows the user to remove a given todo item from their list
     * @param todo the given todo item
     */
    removeTodo(todo: ApiTodo): void {
        let index = this.todos.indexOf(todo);
        if (index > -1) {
            this.todos.splice(index, 1);
            this.todoService.removeTodo(todo);
        }
    }
}
