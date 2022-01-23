import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './app/core/filters/all.exceptions.filter';
import { MyLogger } from './app/core/logger/custom.logger';
import { LoggerMiddleware } from './app/core/middlewares/logger.middleware';
import { TodoModule } from './app/modules/todo/todo.module';

@Module({
    imports    : [ TodoModule ],
    controllers: [],
    providers  : [
        {
            provide : APP_FILTER,
            useClass: AllExceptionsFilter,
        }
    ],
    exports    : []
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes('*');
    }
}