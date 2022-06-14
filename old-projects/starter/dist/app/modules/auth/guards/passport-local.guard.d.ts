import { AuthService } from "../services/auth.service";
declare const PassportLocalGuard_base: new (...args: any[]) => any;
export declare class PassportLocalGuard extends PassportLocalGuard_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(email: string, password: string, done: Function): Promise<any>;
}
export {};
