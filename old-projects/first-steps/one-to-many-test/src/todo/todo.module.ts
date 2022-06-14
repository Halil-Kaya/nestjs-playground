import { Module } from '@nestjs/common';
import { TodoService } from './services/todo.service';
import { TodoController } from './controllers/todo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './models/todo';

@Module({
  imports : [
    MongooseModule.forFeature([
      { name: Todo.name, schema: TodoSchema }
    ])
  ],
  providers: [TodoService],
  controllers: [TodoController]
})
export class TodoModule {}
