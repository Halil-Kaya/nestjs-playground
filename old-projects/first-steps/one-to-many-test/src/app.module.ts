import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
          uri             :"mongodb://127.0.0.1:27017/one-to-many?readPreference=primary&ssl=false",
          useCreateIndex  : true,
          useFindAndModify: false
      })
    }),
    UserModule,
    TodoModule],

})
export class AppModule {}
