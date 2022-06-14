import { Injectable } from "@nestjs/common";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { ConfigService }              from '@nestjs/config';

import * as $$                        from 'lodash';
import { User } from "../../user/model/user";
import { IEnvironment } from "src/app/interfaces/environment.interface";

@Injectable()
export class JwtHelper{

    private readonly jwtOptions:JwtSignOptions;

    constructor(
        private readonly config: ConfigService<IEnvironment>,
        private readonly jwtService: JwtService
    ) {
        this.jwtOptions = {
            secret   : config.get<string>('JWT_SECRET'),
            expiresIn: config.get<string>('JWT_EXPIRES'),
            algorithm: config.get('JWT_ALGORITHM')
        };
    }
    public sign(payload : any) : string {
        return this.jwtService.sign(payload,this.jwtOptions);
    }

    public signSanitizedUser(user : User) : any{

        return this.sign(
            $$.pick(user,[
                '_id',
                'role'
            ])
        )
    }


}