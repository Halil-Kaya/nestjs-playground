import { Document } from 'mongoose';
export declare class Todo extends Document {
    title: string;
    description: string;
}
export declare const TodoSchema: import("mongoose").Schema<Todo, import("mongoose").Model<any, any>, undefined>;
