import { AModule } from './a.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  imports: [
        AModule, ],
  controllers: [AppController,CatsController],
  providers: [AppService,CatsService],
})
export class AppModule {}
