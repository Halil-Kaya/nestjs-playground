import {Module} from '@nestjs/common';
import {UserModule} from "./users/user.module";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
    imports: [
        UserModule,
        MongooseModule.forRoot('mongodb://localhost:27017/ddd')
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
