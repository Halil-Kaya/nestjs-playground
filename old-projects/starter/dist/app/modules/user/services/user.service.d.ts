import { FilterQuery, Model } from 'mongoose';
import { IPagination, Paginated } from 'src/app/interfaces/pagination.interface';
import { User } from '../models/user';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    create(user: User): Promise<User>;
    findById(id: string): Promise<User>;
    findOne(query: FilterQuery<User>): Promise<User>;
    updateUser(query: FilterQuery<User>, user: Partial<User>): Promise<User>;
    findUsers(paginate?: IPagination, query?: FilterQuery<User>): Promise<Paginated<User>>;
}
