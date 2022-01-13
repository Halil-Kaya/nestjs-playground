import {InjectModel} from "@nestjs/mongoose";
import {User, UserSchema} from "../model/user.model";
import {Model} from "mongoose";
import {UserDto} from "../dto/user.dto";
import {CreateUserRequest} from "../dto/request/user.create.request";

export class UserRepository {
    constructor(
        @InjectModel(User.name) readonly userModel: Model<User>
    ) {
    }

    async findById(userId: string): Promise<UserDto> {
        return this.userModel
            .findById(userId)
            .exec()
    }

    async findAll(): Promise<UserDto[]> {
        return this.userModel.find({})
            .exec()
    }

    async create(createUserRequest: CreateUserRequest) :Promise<User>{
        return  await this.userModel
            .create(createUserRequest)
    }
}