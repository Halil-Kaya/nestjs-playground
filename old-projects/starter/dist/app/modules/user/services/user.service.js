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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const try_catch_decorator_1 = require("../../../core/decorators/try-catch.decorator");
const pagination_interface_1 = require("../../../interfaces/pagination.interface");
const user_1 = require("../models/user");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    create(user) {
        return this.userModel.create(user);
    }
    findById(id) {
        return this.userModel
            .findById(mongoose_2.Types.ObjectId(id))
            .exec();
    }
    findOne(query) {
        return this.userModel
            .findOne(query)
            .exec();
    }
    updateUser(query, user) {
        if (query._id) {
            query._id = mongoose_2.Types.ObjectId(query._id);
        }
        return this.userModel
            .findOneAndUpdate(Object.assign({ deletedAt: null }, query), Object.assign({}, user), { new: true }).exec();
    }
    async findUsers(paginate, query) {
        const count = await this.userModel.countDocuments(Object.assign({ deletedAt: null }, query));
        const users = await this.userModel
            .find(Object.assign({ deletedAt: null }, query))
            .select([
            '-deletedAt',
            '-bannedAt',
            '-updatedAt',
            '-protectedAt',
            '-password'
        ])
            .skip(paginate ? paginate.offset : 0)
            .limit(paginate ? paginate.limit : undefined);
        return {
            count: count,
            data: users
        };
    }
};
__decorate([
    try_catch_decorator_1.TryCatch(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "findUsers", null);
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(user_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map