import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ResponseHelper } from 'src/app/core/helpers/response.helper';
import { User } from '../../user/models/user';
import { AuthGuard } from '@nestjs/passport';
import { TryCatch } from 'src/app/core/decorators/try-catch.decorator';
import { JwtHelper } from '../helpers/jwt.helper';
import { UserService } from '../../user/services/user.service';
import * as $$       from 'lodash';
import { checkResult } from 'src/app/core/helpers/check-result';


@Controller('auth')
export class AuthController {

    private controller = 'AuthController';
    private resHelper = new ResponseHelper()

    constructor(
        private readonly jwtHelper : JwtHelper,
        private readonly userService: UserService
    ){}


    @Post('login')
    @UseGuards(AuthGuard('local'))
    @TryCatch()
    login(@Req() request, @Res() response){

        const token = this.jwtHelper.signSanitizedUser(request.user);
        response
            .json(this.resHelper.set(
                200,
                {
                    token,
                    ...$$.pick(request.user, [
                        'firstName',
                        'lastName',
                        'permissions',
                        'role'
                    ])
                },
                {
                    controller : this.controller,
                    params : request.params,
                    headers : request.headers
                }
            ))

    }

    @Post('create')
    @TryCatch()
    async create(@Req() request, @Res() response, @Body() user:User){

        const registeredUser = await this.userService.create(user);
        checkResult<User>(registeredUser,'ERRORS.USER_CREATE')

        const token = this.jwtHelper.signSanitizedUser(registeredUser);
        response.json(this.resHelper.set(
            200,
            {
                token,
                ...$$.pick(request.user,[ //!! request.user ->  registeredUser
                    'firstName',
                    'lastName',
                    'permissions',
                    'role'
                ])
            },
            {
                controller : this.controller,
                params : request.params,
                headers : request.headers
            }
        ))

    }

    @Get('check')
    @UseGuards(AuthGuard('jwt'))
    @TryCatch()
    checkAuth(@Req() request, @Res() response){
        
        const token = this.jwtHelper.signSanitizedUser(request.user);
        response.json(
            this.resHelper.set(
                200,
                {
                    token,
                    ...$$.pick(request.user,
                    [
                        'firstName',
                        'lastName',
                        'permissions',
                        'role'
                    ])
                }
            )
        )

    }

    @Post('facebook')
    @UseGuards(AuthGuard('facebook-token'))
    facebookAuth(@Req() request,@Res() response){

        const token = this.jwtHelper.signSanitizedUser(request.user);
        response
            .json(this.resHelper.set(
                200,
                {
                    token,
                    user: request.user
                },
                {
                    controller: this.controller,
                    params    : request.params,
                    headers   : request.headers
                })
            );
    }

}
