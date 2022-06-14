import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Todo } from '../../todo/model/todo';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {


    constructor(private userService : UserService){}

    @Get()
    async findAll(@Res() response){
        response.json(await this.userService.findAll());
    }

    @Post()
    async create(@Res() response,@Body() user){
        response.json(await this.userService.create(user));
    }

    // @Post('/:id')
    // async addTodoToUser(@Res() response,@Param('id') id:string,@Body() todo:Todo){
    //     response.json(await this.userService.addTodoToUser(id,todo))
    // }

}
