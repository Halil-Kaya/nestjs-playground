import {CommandHandler,ICommandHandler} from "@nestjs/cqrs";
import {UserRepository} from "../db/user.repository";
import {CreateUserRequest} from "../dto/request/user.create.request";

export class AddUserCommand {
    constructor(public readonly createUserRequest: CreateUserRequest) {}
}

@CommandHandler(AddUserCommand)
export class UserAddHandler implements ICommandHandler<AddUserCommand> {
    constructor(
        private readonly userRepository : UserRepository
    ) {}

    async execute({ createUserRequest }: AddUserCommand): Promise<void> {
        await this.userRepository.create(createUserRequest)
    }
}