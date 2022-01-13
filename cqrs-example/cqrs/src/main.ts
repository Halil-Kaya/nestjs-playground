import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(3000);
  return app;
}
bootstrap()
    .then(async (app) => {
      console.log(`App is running on: ${await app.getUrl()}`);
    })
    .catch((error: Error) => console.error(error.message));