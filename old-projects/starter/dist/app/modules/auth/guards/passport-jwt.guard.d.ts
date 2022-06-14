import { ConfigService } from "@nestjs/config";
import { IEntvironment } from "src/app/interfaces/environment.interface";
import { ISanitizedUser } from "../../user/interfaces/sanitized-user.interface";
import { AuthService } from "../services/auth.service";
declare const PassportJwtGuard_base: new (...args: any[]) => any;
export declare class PassportJwtGuard extends PassportJwtGuard_base {
    private readonly configService;
    private readonly authService;
    constructor(configService: ConfigService<IEntvironment>, authService: AuthService);
    validate(payload: ISanitizedUser, done: Function): Promise<any>;
}
export {};
