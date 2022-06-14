import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITodo } from 'src/todo/interfaces/todo.interface';
import { Todo } from 'src/todo/models/todo';
import { IUser } from '../interfaces/user.interface';
import { User } from '../models/user';

@Injectable()
export class UserService {


    constructor(@InjectModel(User.name) private readonly userModel:Model<User>){}

    create(user:IUser):Promise<User>{
        return this.userModel.create(user);
    }

    /*???user in icinde todo var usera todo ekliyorum???*/
    async addTodoToUser(id:string,todo:Todo):Promise<User>{
        console.log('1')
        const user = await this.userModel.findOne({id});
        console.log('2')
        user.todos.push(todo);
        console.log('3')

        return await user.save(); 

        //return this.userModel.findOneAndUpdate({deletedAt:null},{...user},{new:true})

    }




}
