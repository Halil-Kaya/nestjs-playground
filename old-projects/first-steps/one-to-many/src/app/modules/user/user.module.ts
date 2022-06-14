import { UserService } from './services/user.service';
import { UserController } from './controller/user.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/user';
import { TodoModule } from '../todo/todo.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name : User.name,schema : UserSchema}
    ])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports : [UserService]
})
export class UserModule {}
