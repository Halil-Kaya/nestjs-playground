import { Schema, Prop, SchemaFactory }        from '@nestjs/mongoose';
import {Document} from 'mongoose';


@Schema({versionKey:false})
export class Todo extends Document {

    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: String, trim: true })
    description: string;

}

export const TodoSchema = SchemaFactory.createForClass(Todo);
