import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe() )
  await app.listen(3000);
  console.log(`Server is listening on ${await app.getUrl()}`);
}
bootstrap();
