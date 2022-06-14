import { Body, Controller, ForbiddenException, Get, Post, Req, Res, UseFilters } from "@nestjs/common";
import { HttpExceptionFilter } from "src/filter/http-exception.filter";
import { CreateTodoDto } from "./dto/create-todo";
import { ITodo } from "./interfaces/todo.interfaces";
import { TodoService } from "./todo.service";

@Controller("todo")
export class TodoController{
    constructor(private readonly todoService:TodoService){}


    @Get()
    getAllTodos(@Res() response){
        return response.status(200).json(this.todoService.getAll())
    }

    
    @Post()
    @UseFilters(new HttpExceptionFilter())
    createTodo(@Res() response,@Body() body:ITodo){
        this.todoService.create(body)
        response.json(body)
    }


}