import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Todo } from '../model/todo';
import * as mongoose from "mongoose";
import { User } from '../../user/model/user';


@Injectable()
export class TodoService {

    constructor(@InjectModel(Todo.name) private todoModel:Model<Todo>){}

    async create(todo : Todo ) : Promise<Todo>{
        let newTodo = new this.todoModel(todo);
        return await newTodo.save()
    }

    async findAll() : Promise<Todo[]>{
        return await this.todoModel.find()
    }

    async findAllWithUser() : Promise<Todo[]>{
        return await this.todoModel.find().populate('user')
    }

    async getTodosWithUser(userId: string) : Promise<Todo[]>{

        return await this.todoModel.find({user :  Types.ObjectId(userId) }).populate('user')
    }

}
