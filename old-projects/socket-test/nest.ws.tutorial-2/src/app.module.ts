import { AlertController } from './alert/alert.controller';
import { AlertGateway } from './alert/alert.gateway';
import { ChatGateway } from './chat/chat.gateway';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [AlertController],
  providers: [AlertGateway, ChatGateway],
})
export class AppModule {}
