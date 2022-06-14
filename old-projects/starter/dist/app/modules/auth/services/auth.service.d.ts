import { ISanitizedUser } from '../../user/interfaces/sanitized-user.interface';
import { User } from '../../user/models/user';
import { UserService } from '../../user/services/user.service';
import { IFacebookAuth } from '../interfaces/facebook-auth.interface';
import { IGoogleAuth } from '../interfaces/google-auth.interface';
export declare class AuthService {
    private readonly userService;
    constructor(userService: UserService);
    signByJwt(sanitizedUser: ISanitizedUser): Promise<User>;
    signByCredentials(email: string, password: string): Promise<User>;
    signByGoogle(profile: IGoogleAuth): Promise<User>;
    signByFacebook(profile: IFacebookAuth): Promise<User>;
    private createIfNull;
    private convertGoogleToUser;
    private convertFacebookToUser;
}
