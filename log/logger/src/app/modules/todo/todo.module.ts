import { Module } from '@nestjs/common';
import { TodoController } from './controller/todo.controller';
import { Todo } from './model/todo';
import { TodoService } from './service/todo.service';

@Module({
    imports    : [],
    controllers: [ TodoController ],
    providers  : [ TodoService ],
    exports    : [ TodoService ]
})
export class TodoModule {
}
