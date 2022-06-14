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
exports.JwtHelper = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const environment_interface_1 = require("../../../interfaces/environment.interface");
const $$ = require("lodash");
let JwtHelper = class JwtHelper {
    constructor(config, jwtService) {
        this.config = config;
        this.jwtService = jwtService;
        this.jwtOptions = {
            secret: config.get('JWT_SECRET'),
            expiresIn: config.get('JWT_EXPIRES'),
            algorithm: config.get('JWT_ALGORITHM')
        };
    }
    sign(payload) {
        return this.jwtService.sign(payload, this.jwtOptions);
    }
    signSanitizedUser(user) {
        return this.sign($$.pick(user, [
            '_id',
            'userType',
            'roles'
        ]));
    }
};
JwtHelper = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        jwt_1.JwtService])
], JwtHelper);
exports.JwtHelper = JwtHelper;
//# sourceMappingURL=jwt.helper.js.map