import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {UserRepository} from "../db/user.repository";
import {UserDto} from "../dto/user.dto";

export class ListUsersQuery {
}

@QueryHandler(ListUsersQuery)
export class UserListHandler implements IQueryHandler<ListUsersQuery> {
    constructor(
        private readonly userRepository : UserRepository
    ) {
    }

    public async execute(query: ListUsersQuery): Promise<UserDto[]> {
        return this.userRepository.findAll()
    }
}