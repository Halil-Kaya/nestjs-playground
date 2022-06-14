import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { request, response } from 'express';
import { AppService } from './app.service';

@Controller('cat')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() request, @Res() response) {
    
    response.json({ message: 'data dondu' });
  }

  @Post()
  postRequest(@Req() request, @Res() response, @Body() body) {
    return response.status(200).json({ message: 'ok', data: body });
  }

  @Get('ab*cd')
  findAll(): string {
    return 'This route uses a wildcard';
  }

  @Get(':id')
  findOne(@Param('id') id, @Res() response) {
    console.log(typeof id);
    response.json({ message: id });
  }


}
