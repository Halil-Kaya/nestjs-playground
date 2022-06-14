import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { request } from 'express';
import { User } from '../../user/model/user';
import { UserService } from '../../user/services/user.service';
import { JwtHelper } from '../helpers/jwt.helper';
import * as $$ from 'lodash';
import { RolesGuard } from '../guards/roles.guard';
import { Role } from 'src/app/core/enums/role.enum';
import { Roles } from 'src/app/core/decorators/roles.decorators';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtHelper: JwtHelper,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Req() request, @Res() response) {
    const token = this.jwtHelper.signSanitizedUser(request.user);

    response.json({
      token: token,
      user: request.user,
    });
  }

  @Get('check')
  @UseGuards(AuthGuard('jwt'))
  checkAuth(@Req() request, @Res() response) {
    const token = this.jwtHelper.signSanitizedUser(request.user);

    response.json({
      token: token,
      user: request.user,
    });
  }

  @Post('create')
  async create(@Req() request, @Res() response, @Body() user: User) {
    const registeredUser = await this.userService.create(user);

    if (!registeredUser) throw new Error();

    const token = this.jwtHelper.signSanitizedUser(registeredUser);

    response.json({
      token: token,
      ...$$.pick(registeredUser, ['name', 'email', 'role']),
    });
  }

  @Get('test')
  @Roles(Role.User)
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  foo() {
    return 'test';
  }


}
