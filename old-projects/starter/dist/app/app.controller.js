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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const try_catch_decorator_1 = require("./core/decorators/try-catch.decorator");
const base_error_1 = require("./core/errors/base.error");
const response_helper_1 = require("./core/helpers/response.helper");
let AppController = class AppController {
    constructor() {
        this.controller = "AppController";
        this.resHelper = new response_helper_1.ResponseHelper();
    }
    test(response, request) {
        const data = {
            arr: [1, 2, 3, 4, 5],
            str: "hello"
        };
        response.json(this.resHelper.set(200, data, {
            controller: this.controller,
            params: request.param,
            headers: request.headers
        }));
    }
    test2() {
        throw new base_error_1.BaseError(401, 'ERRORS.USER_NOT_FOUND', null);
    }
};
__decorate([
    common_1.Get(),
    try_catch_decorator_1.TryCatch(),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "test", null);
__decorate([
    common_1.Get('a'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "test2", null);
AppController = __decorate([
    common_1.Controller('app')
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map