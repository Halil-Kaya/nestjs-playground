import { ItemsModule } from './items/items.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsController } from './items/items.controller';
import { ItemsService } from './items/items.service';
import { MongooseModule} from "@nestjs/mongoose"
import config from "./config/keys";

@Module({
  imports: [ItemsModule,MongooseModule.forRoot(config.mongoURI)],
})
export class AppModule {}
