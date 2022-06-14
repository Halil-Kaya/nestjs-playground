import { Body, Controller, Get, Param, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test')
  async test(@Req() request,@Res() response){
    response.json({hello : 'hey hello'})
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file) {
    return await this.appService.upload(file);
  }
  
  @Get('upload-test')
  async uploadTest(@Req() request,@Res() response,@Body('file-name') body){

      const result = await this.appService.getUrl(body)

      response.json({message : result})
    
  }

}
