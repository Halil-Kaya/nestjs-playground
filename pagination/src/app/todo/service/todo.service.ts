import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from '../model/todo';
import { Model, FilterQuery } from "mongoose";
import { Pagination } from '@source/app/core/decorators/pagination.decorator';

@Injectable()
export class TodoService {
    constructor(@InjectModel(Todo.name) readonly todoModel: Model<Todo>) {
    }

    async create(newTodo: any) {
        let todo = await this.todoModel
            .findOne()
            .sort({ order: -1 })
            .limit(1)
        let order = 1
        if (todo) {
            order = todo.order
        }
        newTodo['order'] = (order + 1)
        return await this.todoModel.create(newTodo)
    }

    async getTodos(pagination: Pagination, query?: FilterQuery<Todo>): Promise<Todo[]> {
        await this.updatePagination(pagination)
        return this.todoModel
            .find({ ...query })
            .sort({ [pagination?.sort]: pagination?.order })
            .skip(pagination?.offset ? pagination.offset : 0)
            .limit(pagination?.limit ? pagination.limit : 15)
    }

    async updatePagination(pagination: Pagination, query?: FilterQuery<Todo>) {
        pagination.totalData = await this.todoModel.count({ ...query })
        pagination.limit = pagination.limit ? pagination.limit : 15
        pagination.totalPage = Math.floor(pagination.totalData / pagination.limit)
        pagination.hasNextPage = pagination.currentPage >= pagination.totalPage ? false : true
        pagination.hasPreviousPage = pagination.currentPage > 0 ? true : false
    }
}