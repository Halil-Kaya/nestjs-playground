import { Schema, Prop, SchemaFactory }        from '@nestjs/mongoose';
import {Document,Types} from 'mongoose';
import { Todo } from 'src/todo/models/todo';


@Schema({versionKey:false})
export class User extends Document {


    @Prop({ type: String, required: true })
    email: string;

    @Prop({ type: String, trim: true })
    firstName: string;

    @Prop({ type: String, trim: true })
    lastName: string;

    @Prop({ type: String, required: true, trim: true, minlength: 6 })
    password: string;

    @Prop({ type: Date, default: new Date(Date.now()) })
    createdAt: Date;

    @Prop({type: [Types.ObjectId],ref:Todo.name})
    todos:Todo[];


}

export const UserSchema = SchemaFactory.createForClass(User);
