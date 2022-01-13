import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseModel } from "@source/app/core/base/base.model";
import { Document } from "mongoose";

@Schema({
    versionKey: false,
    timestamps: true
})
export class Todo extends BaseModel {
    @Prop({
        type: String,
        required: true
    })
    title: string;

    @Prop({
        type: String,
        required: true
    })
    description: string;

    @Prop({
        type: Number,
        required: true
    })
    order: number;
}

export type TodoDocument = Todo & Document
export const TodoSchema = SchemaFactory.createForClass(Todo);