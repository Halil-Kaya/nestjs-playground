import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Todo } from '../../todo/model/todo';
import { TodoService } from '../../todo/services/todo.service';
import { User } from '../model/user';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async create(user: User): Promise<User> {
    let newUser = new this.userModel(user);
    return await newUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(query: FilterQuery<User>): Promise<User> {
    return await this.userModel.findOne(query);
  }

}
