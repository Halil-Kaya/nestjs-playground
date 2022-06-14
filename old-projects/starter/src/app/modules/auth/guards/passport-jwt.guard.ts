import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy }     from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { BaseError } from "src/app/core/errors/base.error";
import { IEntvironment } from "src/app/interfaces/environment.interface";
import { ISanitizedUser } from "../../user/interfaces/sanitized-user.interface";
import { AuthService } from "../services/auth.service";


@Injectable()
export class PassportJwtGuard extends PassportStrategy(Strategy,'jwt'){

    constructor(
        private readonly configService: ConfigService<IEntvironment>,
        private readonly authService: AuthService
    ) {
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration : false,
            secretOrKey : configService.get('JWT_SECRET')
        });
    }

    async validate(payload : ISanitizedUser,done : Function) {
        return this.authService
            .signByJwt(payload)
            .then(signedUser => {

                if(!signedUser){//kullanici yoksa callback fonksiyonunda hata firlatiyor
                    return done(new BaseError(401,'ERRORS.USER_NOT_FOUND',null),null)
                }

                return done(null,signedUser.toObject())
            })

            .catch((err : Error) => {
                throw new BaseError(
                    401,
                    'ERRORS.UNAUTHORIZED',
                    err
                )
            })
    }

}