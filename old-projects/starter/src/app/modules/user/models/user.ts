
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SocialAccount, SocialAccountSchema } from './social-account';

@Schema({ versionKey: false })
export class User extends Document {

    @Prop({ type: String, required: true ,unique : true})
    email: string;

    @Prop({ type: String })
    phoneNumber: string;

    @Prop({ type: String, trim: true })
    firstName: string;

    @Prop({ type: String, trim: true })
    lastName: string;

    @Prop({ type: String, trim: true })
    fullName: string;

    @Prop({ type: String, required: true, trim: true, minlength:6 })
    password: string;

    @Prop({
        type : SocialAccountSchema,
        default : null
    })
    google : SocialAccount;

    @Prop({
        type : SocialAccountSchema,
    })
    facebook : SocialAccount;

    @Prop({ type : String, trim: true })
    profilePicture : string;

    @Prop({type : String, enum : ['ADMIN', 'USER'],default : 'USER'})
    role: string;

    @Prop({ type : [ String ]})
    permissions: string[];

    @Prop({ type: String})
    verificationCode : string;

    @Prop({ type : Date,default: new Date(Date.now())})
    createdAt: Date;

    @Prop({ type: Date, default: null})
    deletedAt : Date | null;

    @Prop({type: Date, default: null})
    protectedAt : Date | null;

    @Prop({ type: Date, default: null})
    bannedAt : Date | null;

    validatePassword : Function;

}

export const UserSchema = SchemaFactory.createForClass(User)
UserSchema.index([ '_id' ]);


//parametre olarak gonderilen sifre ile user in sifresini karsilastiriyor
UserSchema.methods.validatePassword = function(password: string) : Promise<boolean> {
    return bcrypt.compare(password,this.password)
}


//userin sifresini database kaydetmeden once hashliyor
UserSchema.pre<User>('save',async function(next) {

    let user:User = this;
    //password guncellenmediyse ve kullanici yeni degilse sonraki middleware geciyor
    if(!user.isModified('password') || !user.isNew){
        next()
    }

    //userin passwordunu hashliyor
    user.password = await bcrypt.hash(user.password, 12);
    //sonraki middleware geciyor
    next();
});