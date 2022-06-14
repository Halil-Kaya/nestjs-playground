import { User } from '../../user/models/user';
import { JwtHelper } from '../helpers/jwt.helper';
import { UserService } from '../../user/services/user.service';
export declare class AuthController {
    private readonly jwtHelper;
    private readonly userService;
    private controller;
    private resHelper;
    constructor(jwtHelper: JwtHelper, userService: UserService);
    login(request: any, response: any): void;
    create(request: any, response: any, user: User): Promise<void>;
    checkAuth(request: any, response: any): void;
    facebookAuth(request: any, response: any): void;
}
