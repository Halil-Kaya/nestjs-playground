import { Document } from 'mongoose';
export declare class SocialAccount extends Document {
    id: string;
    token: string;
    displayName: string;
    emails: string[];
    profilePicture: string;
    registeredAt: Date;
    lastLoginAt: Date;
}
export declare const SocialAccountSchema: import("mongoose").Schema<SocialAccount, import("mongoose").Model<any, any>, undefined>;
