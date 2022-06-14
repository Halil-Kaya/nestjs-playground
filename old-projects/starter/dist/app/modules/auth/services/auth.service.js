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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const try_catch_decorator_1 = require("../../../core/decorators/try-catch.decorator");
const check_result_1 = require("../../../core/helpers/check-result");
const user_service_1 = require("../../user/services/user.service");
let AuthService = class AuthService {
    constructor(userService) {
        this.userService = userService;
    }
    async signByJwt(sanitizedUser) {
        return this.userService.findOne({
            _id: mongoose_1.Types.ObjectId(sanitizedUser._id)
        });
    }
    async signByCredentials(email, password) {
        const user = await this.userService.findOne({ email: email });
        check_result_1.checkResult(user, 'ERRORS.USER_NOT_FOUND');
        const isValid = await user.validatePassword(password);
        check_result_1.checkResult(isValid, 'ERRORS.WRONG_PASSWORD');
        return user;
    }
    async signByGoogle(profile) {
        let user = this.convertGoogleToUser(profile);
        const foundUser = await this.userService.findOne({ 'google.id': user.google.id });
        if (!foundUser) {
            return this.createIfNull(foundUser);
        }
        foundUser.google = Object.assign(Object.assign({}, user.google), { lastLoginAt: new Date(Date.now()) });
        return foundUser.save();
    }
    async signByFacebook(profile) {
        let user = this.convertFacebookToUser(profile);
        const foundUser = await this.userService.findOne({ 'facebook.id': user.facebook.id });
        if (!foundUser) {
            return this.createIfNull(foundUser);
        }
        foundUser.facebook = Object.assign(Object.assign({}, user.facebook), { lastLoginAt: new Date(Date.now()) });
        return foundUser.save();
    }
    createIfNull(user) {
        user.facebook.registeredAt = new Date(Date.now());
        return this.userService.create(user);
    }
    convertGoogleToUser(profile) {
        var _a;
        return {
            firstName: profile.given_name,
            lastName: profile.family_name,
            fullName: profile.name,
            profilePicture: (_a = profile.picture) !== null && _a !== void 0 ? _a : undefined,
            google: {
                id: profile.sub,
                emails: profile.email,
                displayName: profile.name,
            }
        };
    }
    convertFacebookToUser(profile) {
        var _a, _b, _c;
        return {
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            fullName: profile.displayName,
            profilePicture: (_b = (_a = profile.photos[0]) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : undefined,
            facebook: {
                id: profile.id,
                emails: (_c = profile.emails) === null || _c === void 0 ? void 0 : _c.map(mail => mail.value),
                displayName: profile.displayName
            }
        };
    }
};
__decorate([
    try_catch_decorator_1.TryCatch(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "signByCredentials", null);
__decorate([
    try_catch_decorator_1.TryCatch(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "signByGoogle", null);
__decorate([
    try_catch_decorator_1.TryCatch(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "signByFacebook", null);
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map