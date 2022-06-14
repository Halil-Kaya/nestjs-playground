import { AuthModule } from './app/modules/auth/auth.module';
import { UserModule } from './app/modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IEntvironment } from './app/interfaces/environment.interface';
import { AppController } from './app/app.controller';
import { LoggerMiddleware } from './app/core/middleware/logger.middleware';

const ENV = process.env.MODE;

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      envFilePath: !ENV
        ? './src/environments/.env'
        : `./src/environments/.env.${ENV}`, //envioronment dosya pathini veriyorum
      isGlobal: true, // her yerde gecerli olmasini belirtiyorum
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule], // configModule kullanicam o yuzden import ediyorum,
      useFactory: (configService: ConfigService<IEntvironment>) => ({
        uri: configService.get<string>('MONGO_CONNECTION_STRING'),
        useCreateIndex: true,
        useFindAndModify: false,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
})

//middleware in her requestte olmasini belirtiyorum
export class AppModule implements NestModule {
  //her istek once buraya girecek
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
