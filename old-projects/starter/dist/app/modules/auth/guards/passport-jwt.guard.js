"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassportJwtGuard = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const base_error_1 = require("../../../core/errors/base.error");
const environment_interface_1 = require("../../../interfaces/environment.interface");
const auth_service_1 = require("../services/auth.service");
let PassportJwtGuard = class PassportJwtGuard extends passport_1.PassportStrategy(passport_jwt_1.Strategy, 'jwt') {
    constructor(configService, authService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET')
        });
        this.configService = configService;
        this.authService = authService;
    }
    async validate(payload, done) {
        return this.authService
            .signByJwt(payload)
            .then(signedUser => {
            if (!signedUser) {
                return done(new base_error_1.BaseError(401, 'ERRORS.USER_NOT_FOUND', null), null);
            }
            return done(null, signedUser.toObject());
        })
            .catch((err) => {
            throw new base_error_1.BaseError(401, 'ERRORS.UNAUTHORIZED', err);
        });
    }
};
PassportJwtGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        auth_service_1.AuthService])
], PassportJwtGuard);
exports.PassportJwtGuard = PassportJwtGuard;
//# sourceMappingURL=passport-jwt.guard.js.map