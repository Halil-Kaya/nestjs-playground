import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './app/core/filters/all-exceptions-filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(3000);
  return app
}
bootstrap()
  .then(async app => {
    console.log(`App is running on: ${await app.getUrl()}`);
  })
  .catch(err => {
    console.log(err.message)
  })
