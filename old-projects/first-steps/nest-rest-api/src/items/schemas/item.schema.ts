import * as mongoose from "mongoose";

export const ItemSchema = new mongoose.Schema({
    id:String,
    name:String,
    description:String,
    qty:Number
})