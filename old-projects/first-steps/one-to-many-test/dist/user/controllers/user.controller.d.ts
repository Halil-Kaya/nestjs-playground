import { Todo } from 'src/todo/models/todo';
import { IUser } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(user: IUser): Promise<import("../models/user").User>;
    addTodo(todo: Todo, id: string): Promise<import("../models/user").User>;
}
