import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {User} from "../model/user.model";
import {UserRepository} from "../db/user.repository";
import {UserDto} from "../dto/user.dto";

export class GetUserByIdQuery {
    constructor(
        public id: any
    ) { }
}

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements
    IQueryHandler<GetUserByIdQuery> {
    constructor(
        private readonly userRepository : UserRepository
    ) { }
    public async execute({id}: GetUserByIdQuery): Promise<UserDto> {
        return await this.userRepository.findById(id);
    }
}
