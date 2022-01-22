import { Body, Controller, Get, Next, Post, Req, Res, UseGuards, Param, Patch, Delete } from '@nestjs/common';
import { response } from 'express';
import { TodoService } from '../service/todo.service';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Get()
    fetch(@Req() request,
        @Res() response) {
        const result = this.todoService.getAllTodos();
        response.json({
            result
        });
    }

    @Get('/:id')
    getOne(@Req() request,
        @Res() response,
        @Param('id') id: string) {
        const result = this.todoService.getTodoById(id);
        response.json({
            result
        });
    }

    @Post()
    create(@Req() request,
        @Res() response,
        @Body() todo) {
        const result = this.todoService.createTodo(todo);
        response.json({
            result
        });
    }

    @Patch()
    update(@Req() request,
        @Res() response,
        @Body() todo) {
        const result = this.todoService.updateTodo(todo);
        response.json({
            result
        });
    }

    @Delete('/:id')
    delete(@Req() request,
        @Res() response,
        @Param('id') id) {
        const result = this.todoService.deleteTodo(id);
        response.json({
            result
        });
    }
}
