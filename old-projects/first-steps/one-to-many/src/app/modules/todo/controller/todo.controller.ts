import { Param } from '@nestjs/common';
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { TodoService } from '../services/todo.service';

@Controller('todo')
export class TodoController {

    constructor(private todoService : TodoService){}

    @Get()
    async findAll(@Res() response){
        response.json(await this.todoService.findAll());
    }

    @Post()
    async create(@Res() response,@Body() todo){
        response.json(await this.todoService.create(todo));
    }

    @Get('fetch')
    async findAllWithUser(@Res() response){
        response.json(await this.todoService.findAllWithUser())
    }

    @Get('/:id')
    async getTodosWithUser(@Param('id') id,@Res() response){
        response.json(await this.todoService.getTodosWithUser(id))
    }

}
