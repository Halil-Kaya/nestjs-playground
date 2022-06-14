import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy }         from 'passport-local';
import { BaseError } from "src/app/core/errors/base.error";
import { AuthService } from "../services/auth.service";

@Injectable()
export class PassportLocalGuard extends PassportStrategy(Strategy,'local') {

    constructor(
        private readonly authService : AuthService
    ) { 
        super({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : false
        });
    }

    async validate(email : string, password : string, done : Function) : Promise<any> {

        if(!email || !password){
            throw new BaseError(
                404,
                'ERRORS.USER_NOT_FOUND',
                null
            )
        }

        return this.authService
            .signByCredentials(email,password)
            .then(signedUser => {

                if(signedUser){
                    done(null,signedUser.toObject());
                }else{
                    throw new Error('ERRORS.UNAUTHORIZED')
                }
            })
            .catch((err:Error) => {
                done(
                    new BaseError(
                        401,
                        'ERRORS.UNAUTHORIZED',
                        err
                    ),
                    null
                )
            })

    }

}