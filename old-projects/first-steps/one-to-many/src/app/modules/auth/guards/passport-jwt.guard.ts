import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ISanitizedUser } from '../../user/interfaces/sanitized-user.interface';
import { AuthService } from '../services/auth.service';


@Injectable()
export class PassportJwtGuard extends PassportStrategy(Strategy,'jwt'){

  constructor(
    private readonly authService: AuthService
  ){
    super({
      jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration:false,
      secretOrKey : 'secretKey'
    })
  }

  async validate(payload : ISanitizedUser,done : Function){

    return await this.authService.signByJwt(payload)
      .then(signedUser => {

          if(!signedUser){
            return done(
              new Error(),null
            )
          }else{
            done(null,signedUser.toObject())
          }
      })
      .catch(err => {
        throw new Error(err)
      })

  }


}
