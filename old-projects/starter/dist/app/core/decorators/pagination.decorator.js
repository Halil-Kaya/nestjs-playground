"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = void 0;
const common_1 = require("@nestjs/common");
const pagination_interface_1 = require("../../interfaces/pagination.interface");
exports.Pagination = common_1.createParamDecorator((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    let page = request.body.page ? parseInt(request.body.page) : (request.query.page ? parseInt(request.query.page) : 0);
    let limit = request.body.limit ? parseInt(request.body.limit) : (request.query.limit ? parseInt(request.query.limit) : undefined);
    let sort = request.body.sort ? request.body.sort : (request.query.sort ? request.query.sort : undefined);
    let order = request.body.order ? request.body.order : (request.query.order ? request.query.order : undefined);
    return {
        offset: page * limit < 0 ? 0 : (page * limit),
        limit: limit < 0 ? 15 : limit,
        sort: sort,
        order: order
    };
});
//# sourceMappingURL=pagination.decorator.js.map