import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document }                    from 'mongoose';

//???
@Schema({
    _id         : false,
    versionKey  : false
})
export class SocialAccount extends Document{


    @Prop({ type: String })
    id : string;


    @Prop({ type: String })
    token : string;


    @Prop({ type: String })
    displayName : string;


    @Prop({ type: [String] })
    emails : string[];


    @Prop({ type: String })
    profilePicture : string;


    @Prop({
        type : Date,
        default: new Date(Date.now())
    })
    registeredAt : Date;


    @Prop({
        type : Date,
        default: new Date(Date.now())
    })
    lastLoginAt : Date;


}

export const SocialAccountSchema = SchemaFactory.createForClass(SocialAccount);