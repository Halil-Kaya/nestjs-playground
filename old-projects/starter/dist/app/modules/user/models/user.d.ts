import { Document } from 'mongoose';
import { SocialAccount } from './social-account';
export declare class User extends Document {
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    fullName: string;
    password: string;
    google: SocialAccount;
    facebook: SocialAccount;
    profilePicture: string;
    role: string;
    permissions: string[];
    verificationCode: string;
    createdAt: Date;
    deletedAt: Date | null;
    protectedAt: Date | null;
    bannedAt: Date | null;
    validatePassword: Function;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<any, any>, undefined>;
