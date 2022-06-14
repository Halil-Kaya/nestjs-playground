import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ITodo } from 'src/todo/interfaces/todo.interface';
import { Todo } from 'src/todo/models/todo';
import { IUser } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {

    constructor(private userService:UserService){}

    @Post('create')
    create(@Body() user:IUser){
        return this.userService.create(user);
    }

    @Post('todo/:id')
    addTodo(@Body() todo:Todo,@Param('id') id:string){
        return this.userService.addTodoToUser(id,todo);
    }

    

}
