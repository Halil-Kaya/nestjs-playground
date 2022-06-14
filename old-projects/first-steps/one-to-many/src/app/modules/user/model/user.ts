import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as bcrypt                            from 'bcrypt';
import { Document }                           from 'mongoose';
import { Todo } from "../../todo/model/todo";
import * as mongoose from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User extends Document{

    @Prop({type: String,required: true})
    name:string;

    @Prop({type: String,required: true})
    email:string;

    @Prop({ type: String, required: true, trim: true, minlength: 6 })
    password:string;

    @Prop({type : String,enum : ['ADMIN','USER'],default : 'USER'})
    role : string

    // @Prop({type:mongoose.Schema.Types.ObjectId,ref : Todo.name})
    // todos : Todo[]


    validatePassword : Function

}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.methods.validatePassword = function(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

UserSchema.pre<User>('save', async function(next) {

    let user: User = this;
    if(!user.isModified('password') || !user.isNew) {
        next();
    }
    user.password = await bcrypt.hash(user.password, 12);

    next();
});
