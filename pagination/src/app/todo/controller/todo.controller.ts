import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Paginate, Pagination } from '@source/app/core/decorators/pagination.decorator';
import { Request, Response } from 'express';
import { Todo } from '../model/todo';
import { TodoService } from '../service/todo.service';

@Controller('todo')
export class TodoController {

    constructor(private readonly todoService: TodoService) {
    }

    @Get('')
    async getTodos(@Req() request: Request,
        @Res() response: Response,
        @Paginate() pagination: Pagination) {
        const todos = await this.todoService.getTodos(pagination)
        response.json({
            todos,
            paginationInfo: {
                ...pagination
            }
        })
    }

    @Post('')
    async createTodo(@Req() request: Request,
        @Res() response: Response,
        @Body() body) {
        const result = await this.todoService.create(body)
        response.json({
            result
        })
    }

}
