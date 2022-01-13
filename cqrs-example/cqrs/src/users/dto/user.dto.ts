import {Types} from "mongoose";

export class UserDto {
    readonly _id : Types.ObjectId;
    readonly name : string;
    readonly surname: string;
}