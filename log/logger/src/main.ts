import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './app/core/filters/all.exceptions.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new AllExceptionsFilter());
    app.setGlobalPrefix('/api');
    await app.listen(3000);
    return app;
}

bootstrap()
    .then(async (app) => {
        console.log(`App is running on : ${ await app.getUrl() }`);
    })
    .catch((error: Error) => console.error(error.message));
