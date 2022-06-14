import { IPagination } from 'src/app/interfaces/pagination.interface';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
export declare class UserController {
    private readonly userService;
    private controller;
    private resHelper;
    constructor(userService: UserService);
    create(request: any, response: any, user: User): Promise<void>;
    update(request: any, response: any, userId: string, user: User): Promise<void>;
    getAll(request: any, response: any, pagination: IPagination): Promise<void>;
    getById(request: any, response: any, userId: any): Promise<void>;
}
