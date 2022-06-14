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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const pagination_decorator_1 = require("../../../core/decorators/pagination.decorator");
const try_catch_decorator_1 = require("../../../core/decorators/try-catch.decorator");
const check_result_1 = require("../../../core/helpers/check-result");
const response_helper_1 = require("../../../core/helpers/response.helper");
const pagination_interface_1 = require("../../../interfaces/pagination.interface");
const user_1 = require("../models/user");
const user_service_1 = require("../services/user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
        this.controller = 'UserController';
        this.resHelper = new response_helper_1.ResponseHelper();
    }
    async create(request, response, user) {
        const createdUser = await this.userService.create(user);
        check_result_1.checkResult(createdUser, 'ERRORS.USER_CREATE');
        response.json(this.resHelper.set(200, {
            controller: this.controller,
            params: request.params,
            headers: request.headers,
        }));
    }
    async update(request, response, userId, user) {
        const updatedUser = await this.userService.updateUser({ _id: userId }, user);
        check_result_1.checkResult(updatedUser, 'ERRORS.USER_UPDATE');
        response.json(this.resHelper.set(200, updatedUser, {
            controller: this.controller,
            params: request.params,
            headers: request.headers
        }));
    }
    async getAll(request, response, pagination) {
        const paginatedUsers = await this.userService.findUsers(pagination);
        check_result_1.checkResult(paginatedUsers, 'ERROR.USER_NOT_FOUND');
        response.json(this.resHelper.set(200, paginatedUsers.data, {
            controller: this.controller,
            pagination: Object.assign({ total: paginatedUsers.count }, pagination),
            params: request.params,
            headers: request.headers
        }));
    }
    async getById(request, response, userId) {
        const foundUser = await this.userService.findById(userId);
        check_result_1.checkResult(foundUser, 'ERRORS.USER_NOT_FOUND');
        response.json(this.resHelper.set(200, foundUser, {
            controller: this.controller,
            params: request.params,
            headers: request.headers
        }));
    }
};
__decorate([
    common_1.Post('create'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, user_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    common_1.Post('update/:id'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Param('id')), __param(3, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, user_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    common_1.Get('fetch'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, pagination_decorator_1.Pagination()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getById", null);
UserController = __decorate([
    common_1.Controller('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map