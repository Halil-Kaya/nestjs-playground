"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AllExceptionsFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const base_error_1 = require("../errors/base.error");
let AllExceptionsFilter = AllExceptionsFilter_1 = class AllExceptionsFilter {
    constructor() {
        this.logger = new common_2.Logger(AllExceptionsFilter_1.name);
    }
    catch(exception, host) {
        var _a;
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = (exception instanceof common_1.HttpException) ? exception.getStatus() : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const message = (exception instanceof Error) ? exception.message : exception.response.error;
        const innerException = (exception instanceof base_error_1.BaseError) ? ((_a = exception.innerException) !== null && _a !== void 0 ? _a : null) : null;
        this.logger.error(`[ERROR:${status}] ${message.toUpperCase()}`, exception.stack);
        response.status(status)
            .json({
            data: null,
            error: {
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: message,
                innerException
            }
        });
    }
};
AllExceptionsFilter = AllExceptionsFilter_1 = __decorate([
    common_2.Catch()
], AllExceptionsFilter);
exports.AllExceptionsFilter = AllExceptionsFilter;
//# sourceMappingURL=all-exception.filter.js.map