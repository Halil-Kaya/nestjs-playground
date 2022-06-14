import { AuthModule } from './app/modules/auth/auth.module';
import { TodoModule } from './app/modules/todo/todo.module';
import { UserModule } from './app/modules/user/user.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './app/modules/auth/controller/auth.controller';

const ENV = process.env.MODE;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? './src/environments/.env' : `./src/environments/.env.${ ENV }`,
      isGlobal   : true
  }),
    MongooseModule.forRoot(
      'mongodb://127.0.0.1:27017/one-to-many-ex?readPreference=primary',
    ),
    AuthModule,
    TodoModule,
    UserModule,
  ],
  providers: [],
})
export class AppModule {}
