import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Pagination } from 'src/app/core/decorators/pagination.decorator';
import { TryCatch } from 'src/app/core/decorators/try-catch.decorator';
import { checkResult } from 'src/app/core/helpers/check-result';
import { ResponseHelper } from 'src/app/core/helpers/response.helper';
import { IPagination, Paginated } from 'src/app/interfaces/pagination.interface';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {

    private controller = 'UserController';
    private resHelper = new ResponseHelper();


    constructor(
        private readonly userService : UserService
    ) {}


    //*******
    @Post('create')
    async create(@Req() request, @Res() response, @Body() user:User){

        const createdUser = await this.userService.create(user);
        checkResult<User>(createdUser,'ERRORS.USER_CREATE')

        response.json(this.resHelper.set(
            200,
            {
                controller : this.controller,
                params : request.params,
                headers : request.headers,
            }
        ))

    }
    //*******

    @Post('update/:id')
    async update(@Req() request,@Res() response,@Param('id') userId:string, @Body() user : User){

        const updatedUser = await this.userService.updateUser({_id:userId},user)

        checkResult<User>(updatedUser,'ERRORS.USER_UPDATE');//sonucu kontrol ediyor

        response.json(this.resHelper.set(
            200,
            updatedUser,
            {
                controller: this.controller,
                params :  request.params,
                headers : request.headers
            }
        ))
    }

    @Get('fetch')
    async getAll(@Req() request, @Res() response, @Pagination() pagination : IPagination){

        const paginatedUsers = await this.userService.findUsers(pagination);

        checkResult<Paginated<User>>(paginatedUsers,'ERROR.USER_NOT_FOUND');

        response.json(this.resHelper.set(
            200,
            paginatedUsers.data,
            {
                controller : this.controller,
                pagination : {
                    total : paginatedUsers.count,
                    ...pagination
                },
                params : request.params,
                headers : request.headers
            }
        ))

    }


    @Get(':id')
    async getById(@Req() request, @Res() response, @Param('id') userId : any){

        const foundUser = await this.userService.findById(userId);

        checkResult<User>(foundUser,'ERRORS.USER_NOT_FOUND');

        response.json(this.resHelper.set(
            200,
            foundUser,
            {
                controller : this.controller,
                params : request.params,
                headers : request.headers
            }
        ))

    }



}
