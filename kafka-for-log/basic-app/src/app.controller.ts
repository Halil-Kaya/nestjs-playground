import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllTodos(){
    return this.appService.getAllTodos()
  }

  @Get('/:id')
  getTodoById(@Param('id') id : number){
    return this.appService.getById(id)
  }

  @Post()
  createTodo(@Body() body : any){
    return this.appService.createTodo(body)
  }

  @Delete('/:id')
  deleteTodo(@Param('id') id : number){
    return this.appService.deleteTodo(id)
  }
}
