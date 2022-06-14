import { Module } from '@nestjs/common';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';

@Module({
  imports: [],
  controllers: [TodoController],
  providers: [TodoService],
})
export class AppModule {}
