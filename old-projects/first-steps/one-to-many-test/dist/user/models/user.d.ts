import { Document } from 'mongoose';
import { Todo } from 'src/todo/models/todo';
export declare class User extends Document {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    createdAt: Date;
    todos: Todo[];
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<any, any>, undefined>;
