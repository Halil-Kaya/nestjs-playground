import { Injectable } from "@nestjs/common"
import { ITodo } from "./interfaces/todo.interfaces"

@Injectable()
export class TodoService{

    private readonly todos:ITodo[] = [];

    create(todo:ITodo){
        this.todos.push(todo);
    }

    getAll() : ITodo[]{
        return this.todos;
    }

}