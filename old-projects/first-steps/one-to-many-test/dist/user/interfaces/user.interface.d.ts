import { Todo } from "src/todo/models/todo";
export interface IUser {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    todos?: Todo[];
}
