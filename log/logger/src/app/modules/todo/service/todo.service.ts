import { Injectable, Logger } from '@nestjs/common';
import { LoggerService } from 'nest-logger';
import { Todo } from '../model/todo';

@Injectable()
export class TodoService {
    private readonly todos = [];
    private readonly logger = new Logger(TodoService.name);

    constructor() {
    }

    getAllTodos() {
        this.logger.log('hello', {
            hello: 212312
        });
        return this.todos;
    }

    getTodoById(id: string) {
        const todo = this.todos.find(todo => todo._id == id);
        if (!todo) {
            throw new Error('Boyle bir todo yok!');
        }
        return todo;
    }

    createTodo(todo: Todo): Todo {
        if (!todo || !todo.title || !todo.description) {
            throw new Error('Bilgiler yok!');
        }
        todo._id = this.generateRandomID();
        this.todos.push(todo);
        return todo;
    }

    updateTodo(todo: Todo): Todo {
        const targetTodo = this.getTodoById(todo._id);
        if (!targetTodo) {
            throw new Error('Boyle bir todo yok!');
        }
        targetTodo.title = todo.title;
        targetTodo.description = todo.description;
        return targetTodo;
    }

    deleteTodo(id: string) {
        const todo = this.getTodoById(id);
        this.todos.splice(this.todos.findIndex(todo => todo._id == id, 1));
        return todo;
    }

    private generateRandomID(): string {
        return Math.random().toString(36).slice(2);
    }
}
