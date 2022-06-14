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
exports.PassportLocalGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_local_1 = require("passport-local");
const base_error_1 = require("../../../core/errors/base.error");
const auth_service_1 = require("../services/auth.service");
let PassportLocalGuard = class PassportLocalGuard extends passport_1.PassportStrategy(passport_local_1.Strategy, 'local') {
    constructor(authService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: false
        });
        this.authService = authService;
    }
    async validate(email, password, done) {
        if (!email || !password) {
            throw new base_error_1.BaseError(404, 'ERRORS.USER_NOT_FOUND', null);
        }
        return this.authService
            .signByCredentials(email, password)
            .then(signedUser => {
            if (signedUser) {
                done(null, signedUser.toObject());
            }
            else {
                throw new Error('ERRORS.UNAUTHORIZED');
            }
        })
            .catch((err) => {
            done(new base_error_1.BaseError(401, 'ERRORS.UNAUTHORIZED', err), null);
        });
    }
};
PassportLocalGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], PassportLocalGuard);
exports.PassportLocalGuard = PassportLocalGuard;
//# sourceMappingURL=passport-local.guard.js.map