import { TodoModule } from './app/todo/todo.module';
import { TodoService } from './app/todo/service/todo.service';
import { TodoController } from './app/todo/controller/todo.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './app/core/filters/all-exceptions-filter';


@Module({
  imports: [
    TodoModule,
    MongooseModule.forRoot('mongodb://localhost/todo-project')
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    }
  ],
})
export class AppModule { }
