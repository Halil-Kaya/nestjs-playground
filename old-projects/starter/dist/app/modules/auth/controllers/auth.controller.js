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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const response_helper_1 = require("../../../core/helpers/response.helper");
const user_1 = require("../../user/models/user");
const passport_1 = require("@nestjs/passport");
const try_catch_decorator_1 = require("../../../core/decorators/try-catch.decorator");
const jwt_helper_1 = require("../helpers/jwt.helper");
const user_service_1 = require("../../user/services/user.service");
const $$ = require("lodash");
const check_result_1 = require("../../../core/helpers/check-result");
let AuthController = class AuthController {
    constructor(jwtHelper, userService) {
        this.jwtHelper = jwtHelper;
        this.userService = userService;
        this.controller = 'AuthController';
        this.resHelper = new response_helper_1.ResponseHelper();
    }
    login(request, response) {
        const token = this.jwtHelper.signSanitizedUser(request.user);
        response
            .json(this.resHelper.set(200, Object.assign({ token }, $$.pick(request.user, [
            'firstName',
            'lastName',
            'permissions',
            'role'
        ])), {
            controller: this.controller,
            params: request.params,
            headers: request.headers
        }));
    }
    async create(request, response, user) {
        const registeredUser = await this.userService.create(user);
        check_result_1.checkResult(registeredUser, 'ERRORS.USER_CREATE');
        const token = this.jwtHelper.signSanitizedUser(registeredUser);
        response.json(this.resHelper.set(200, Object.assign({ token }, $$.pick(request.user, [
            'firstName',
            'lastName',
            'permissions',
            'role'
        ])), {
            controller: this.controller,
            params: request.params,
            headers: request.headers
        }));
    }
    checkAuth(request, response) {
        const token = this.jwtHelper.signSanitizedUser(request.user);
        response.json(this.resHelper.set(200, Object.assign({ token }, $$.pick(request.user, [
            'firstName',
            'lastName',
            'permissions',
            'role'
        ]))));
    }
    facebookAuth(request, response) {
        const token = this.jwtHelper.signSanitizedUser(request.user);
        response
            .json(this.resHelper.set(200, {
            token,
            user: request.user
        }, {
            controller: this.controller,
            params: request.params,
            headers: request.headers
        }));
    }
};
__decorate([
    common_1.Post('login'),
    common_1.UseGuards(passport_1.AuthGuard('local')),
    try_catch_decorator_1.TryCatch(),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    common_1.Post('create'),
    try_catch_decorator_1.TryCatch(),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, user_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "create", null);
__decorate([
    common_1.Get('check'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    try_catch_decorator_1.TryCatch(),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "checkAuth", null);
__decorate([
    common_1.Post('facebook'),
    common_1.UseGuards(passport_1.AuthGuard('facebook-token')),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "facebookAuth", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [jwt_helper_1.JwtHelper,
        user_service_1.UserService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map