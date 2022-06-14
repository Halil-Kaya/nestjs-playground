import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { TryCatch } from 'src/app/core/decorators/try-catch.decorator';
import { checkResult } from 'src/app/core/helpers/check-result';
import { ISanitizedUser } from '../../user/interfaces/sanitized-user.interface';
import { SocialAccount } from '../../user/models/social-account';
import { User } from '../../user/models/user';
import { UserService } from '../../user/services/user.service';
import { IFacebookAuth } from '../interfaces/facebook-auth.interface';
import { IGoogleAuth } from '../interfaces/google-auth.interface';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService : UserService
    ) {}


    async signByJwt(sanitizedUser :ISanitizedUser) : Promise<User>{
        return this.userService.findOne({
            _id:Types.ObjectId(sanitizedUser._id)
        });
    }

    //email ve password ile giris yapiyor
    @TryCatch()//?
    async signByCredentials(email : string, password : string) : Promise<User> {

        const user = await this.userService.findOne({email : email});
        checkResult<User>(user,'ERRORS.USER_NOT_FOUND');

        const isValid = await user.validatePassword(password);//passwordu kontrol ediyor
        checkResult<boolean>(isValid,'ERRORS.WRONG_PASSWORD');

        return user;
    }


    @TryCatch()
    async signByGoogle(profile : IGoogleAuth) : Promise<User>{

        let user = this.convertGoogleToUser(profile);
        const foundUser = await this.userService.findOne({'google.id' : user.google.id})
        if(!foundUser){//eger boyle bir kullanici yoksa olusturuyor ve islemi bitiriyor
            return this.createIfNull(foundUser) //!!facebooka gore olusturuyor hata verir mi?
        }

        foundUser.google = {
            ...user.google,//sosyel medya bilgileri guncellenmis olabilir o yuzden data guncelleniyor
            lastLoginAt : new Date(Date.now())
        } as SocialAccount;

        return foundUser.save();
    }

    @TryCatch()
    async signByFacebook(profile : IFacebookAuth) : Promise<User> {

        let user = this.convertFacebookToUser(profile);
        const foundUser = await this.userService.findOne({'facebook.id' : user.facebook.id});
        if(!foundUser){//eger boyle bir kullanici yoksa olusturuyor ve islemi bitiriyor
            return this.createIfNull(foundUser);
        }

        foundUser.facebook = {
            ...user.facebook,//sosyel medya bilgileri guncellenmis olabilir o yuzden data guncelliyor
            lastLoginAt : new Date(Date.now())
        } as SocialAccount;

        return foundUser.save();
    }

    //yeni bir kullanici olusturuyor
    //!! -> facebook a gore olusturuyor
    private createIfNull(user : User) : Promise<User>{
        user.facebook.registeredAt = new Date(Date.now());
        return this.userService.create(user)
    }


    private convertGoogleToUser(profile : IGoogleAuth) : User{
        return {
            firstName : profile.given_name,
            lastName : profile.family_name,
            fullName : profile.name,
            profilePicture : profile.picture ?? undefined,
            google : {
                id : profile.sub,
                emails : profile.email,
                displayName : profile.name,
            }
        } as User
    }

    private convertFacebookToUser(profile: IFacebookAuth): User {
        return {
            firstName     : profile.name.givenName,
            lastName      : profile.name.familyName,
            fullName      : profile.displayName,
            profilePicture: profile.photos[0]?.value ?? undefined,
            facebook      : {
                id         : profile.id,
                emails     : profile.emails?.map(mail => mail.value),
                displayName: profile.displayName
            }
        } as User;
    }


}
