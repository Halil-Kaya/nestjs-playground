import {Module} from "@nestjs/common";
import {CqrsModule} from "@nestjs/cqrs";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./model/user.model";
import {UserRepository} from "./db/user.repository";
import {UserQueryHandlers} from "./queries";
import {UsersController} from "./user.controller";
import {UserCommandHandlers} from "./commands";

@Module({
    imports: [
        CqrsModule,
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema
            },
        ]),
    ],
    controllers: [UsersController],
    providers: [
        UserRepository,
        ...UserQueryHandlers,
        ...UserCommandHandlers
    ],
})
export class UserModule {}