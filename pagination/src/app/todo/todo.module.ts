import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoController } from './controller/todo.controller';
import { Todo, TodoSchema } from './model/todo';
import { TodoService } from './service/todo.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Todo.name,
                schema: TodoSchema,
                collection: 'todo'
            }
        ])
    ],
    controllers: [TodoController],
    providers: [TodoService],
    exports: [TodoService]
})
export class TodoModule { }
