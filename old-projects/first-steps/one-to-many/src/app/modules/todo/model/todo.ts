import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../user/model/user";
import * as mongoose from "mongoose";
import { Document }                           from 'mongoose';


@Schema()
export class Todo extends Document{

    @Prop({required:true})
    title:string;

    @Prop({required:true})
    text:string;

    @Prop({type:mongoose.Schema.Types.ObjectId,ref : User.name})
    user : mongoose.Types.ObjectId

}

export const TodoSchema = SchemaFactory.createForClass(Todo);