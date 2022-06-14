"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const auth_service_1 = require("./services/auth.service");
const auth_controller_1 = require("./controllers/auth.controller");
const common_1 = require("@nestjs/common");
const user_module_1 = require("../user/user.module");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const environment_interface_1 = require("../../interfaces/environment.interface");
const passport_jwt_guard_1 = require("./guards/passport-jwt.guard");
const passport_local_guard_1 = require("./guards/passport-local.guard");
const jwt_helper_1 = require("./helpers/jwt.helper");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET')
                }),
                inject: [config_1.ConfigService]
            }),
            user_module_1.UserModule
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            passport_jwt_guard_1.PassportJwtGuard,
            passport_local_guard_1.PassportLocalGuard,
            jwt_helper_1.JwtHelper
        ],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map