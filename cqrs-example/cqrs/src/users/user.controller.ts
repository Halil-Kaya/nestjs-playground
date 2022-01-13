import {Body, Controller, Get, Param, Patch, Post, Request, Response} from "@nestjs/common";
import {UserDto} from "./dto/user.dto";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ListUsersQuery} from "./queries/list.query";
import {CreateUserRequest} from "./dto/request/user.create.request";
import {AddUserCommand} from "./commands/add.user.command";
import {GetUserByIdQuery} from "./queries/get.by.id.query";

@Controller('users')
export class UsersController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {
    }

    @Get(':id')
    async getCamper(@Request() request,
                    @Response() response,
                    @Param('id') userId: string): Promise<void> {
        const result = await this.queryBus.execute<GetUserByIdQuery, UserDto>(new GetUserByIdQuery(userId));
        response.json(result)
    }

    @Get()
    async getUsers(): Promise<UserDto[]> {
        return this.queryBus.execute<ListUsersQuery, UserDto[]>(new ListUsersQuery());
    }

    @Post()
    async createCamper(
        @Body() createCamperRequest: CreateUserRequest,
    ): Promise<void> {
        return await this.commandBus.execute<AddUserCommand, void>(
            new AddUserCommand(createCamperRequest),
        );
    }
}