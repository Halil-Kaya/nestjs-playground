import { TodoService } from './services/todo.service';
import { TodoController } from './controller/todo.controller';
import { Module } from '@nestjs/common';
import { Todo, TodoSchema } from './model/todo';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name : Todo.name,schema : TodoSchema}
    ])
  ],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}
