import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';
import { ISanitizedUser } from '../../user/interfaces/sanitized-user.interface';
import { User } from '../../user/model/user';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService : JwtService,
        private readonly userService : UserService
    ){}

    async signByJwt(sanitizedUser : ISanitizedUser) : Promise<User>{
        return await this.userService.findOne({
            _id : Types.ObjectId(sanitizedUser._id)
        })
    }

    async signByCredentials(email:string,password:string) : Promise<User>{

        const user = await this.userService.findOne({email:email});

        const isValid = await user.validatePassword(password);

        if(!isValid) throw new Error()

        return user;

    }

}
