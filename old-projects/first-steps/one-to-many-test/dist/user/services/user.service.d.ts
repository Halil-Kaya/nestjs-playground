import { Model } from 'mongoose';
import { Todo } from 'src/todo/models/todo';
import { IUser } from '../interfaces/user.interface';
import { User } from '../models/user';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    create(user: IUser): Promise<User>;
    addTodoToUser(id: string, todo: Todo): Promise<User>;
}
