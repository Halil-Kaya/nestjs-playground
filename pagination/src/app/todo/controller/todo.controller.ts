import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Paginate, Pagination } from '@source/app/core/decorators/pagination.decorator';
import { ResponseHelper } from '@source/app/helpers/response.helper';
import { Request, Response } from 'express';
import { Todo } from '../model/todo';
import { TodoService } from '../service/todo.service';

@Controller('todo')
export class TodoController {
    controller = 'todo'
    constructor(private readonly todoService: TodoService) {
    }

    @Get('')
    async getTodos(@Req() request: Request,
        @Res() response: Response,
        @Paginate() pagination: Pagination) {
        const todos = await this.todoService.getTodos(pagination)
        response.json(ResponseHelper.set(
            todos,
            {
                controller: this.controller,
                params: request.params,
                pagination: {
                    ...pagination
                },
                headers: request.headers
            }
        ))
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
