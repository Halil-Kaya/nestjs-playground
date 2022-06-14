import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {JwtSignOptions,JwtService} from '@nestjs/jwt'
import { IEntvironment } from "src/app/interfaces/environment.interface";
import { User } from "../../user/models/user";
import * as $$ from 'lodash';

@Injectable()
export class JwtHelper{

    private readonly jwtOptions : JwtSignOptions;

    constructor(
        private readonly config : ConfigService<IEntvironment>,
        private readonly jwtService : JwtService
    ){
        this.jwtOptions = {
            secret : config.get<string>('JWT_SECRET'),
            expiresIn : config.get<string>('JWT_EXPIRES'),
            algorithm : config.get('JWT_ALGORITHM')
        }
    }

    public sign(payload: any) : string{
        return this.jwtService.sign(payload, this.jwtOptions);
    }

    public signSanitizedUser(user : User){
        //??
        return this.sign(
            $$.pick(user,[ 
                '_id',
                'userType',
                'roles'
            ])
        )
    }



}