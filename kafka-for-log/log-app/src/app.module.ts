import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogService } from './log.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService,LogService],
})
export class AppModule {}
