import { ConfigService } from "@nestjs/config";
import { JwtService } from '@nestjs/jwt';
import { IEntvironment } from "src/app/interfaces/environment.interface";
import { User } from "../../user/models/user";
export declare class JwtHelper {
    private readonly config;
    private readonly jwtService;
    private readonly jwtOptions;
    constructor(config: ConfigService<IEntvironment>, jwtService: JwtService);
    sign(payload: any): string;
    signSanitizedUser(user: User): string;
}
