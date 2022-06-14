import { Controller, Get, Req, Res } from '@nestjs/common';
import { TryCatch } from './core/decorators/try-catch.decorator';
import { BaseError } from './core/errors/base.error';
import { ResponseHelper } from './core/helpers/response.helper';

@Controller('app')
export class AppController {
    private controller = "AppController";
    private resHelper = new ResponseHelper();

    @Get()
    @TryCatch()
    test(@Res() response,@Req() request){
        
        const data = {
            arr : [1,2,3,4,5],
            str : "hello"
        }

        response.json(this.resHelper.set(
            200,
            data,
            {
                controller : this.controller,
                params : request.param,
                headers : request.headers
            }
        ))
    }


    @Get('a')
    test2(){
        throw new BaseError(401,'ERRORS.USER_NOT_FOUND',null);
    }

}
