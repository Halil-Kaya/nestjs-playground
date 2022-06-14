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
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const social_account_1 = require("./social-account");
let User = class User extends mongoose_2.Document {
};
__decorate([
    mongoose_1.Prop({ type: String, required: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    mongoose_1.Prop({ type: String }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    mongoose_1.Prop({ type: String, trim: true }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    mongoose_1.Prop({ type: String, trim: true }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    mongoose_1.Prop({ type: String, trim: true }),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    mongoose_1.Prop({ type: String, required: true, trim: true, minlength: 6 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    mongoose_1.Prop({
        type: social_account_1.SocialAccountSchema,
        default: null
    }),
    __metadata("design:type", social_account_1.SocialAccount)
], User.prototype, "google", void 0);
__decorate([
    mongoose_1.Prop({
        type: social_account_1.SocialAccountSchema,
    }),
    __metadata("design:type", social_account_1.SocialAccount)
], User.prototype, "facebook", void 0);
__decorate([
    mongoose_1.Prop({ type: String, trim: true }),
    __metadata("design:type", String)
], User.prototype, "profilePicture", void 0);
__decorate([
    mongoose_1.Prop({ type: String, enum: ['ADMIN', 'USER'], default: 'USER' }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    mongoose_1.Prop({ type: [String] }),
    __metadata("design:type", Array)
], User.prototype, "permissions", void 0);
__decorate([
    mongoose_1.Prop({ type: String }),
    __metadata("design:type", String)
], User.prototype, "verificationCode", void 0);
__decorate([
    mongoose_1.Prop({ type: Date, default: new Date(Date.now()) }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    mongoose_1.Prop({ type: Date, default: null }),
    __metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
__decorate([
    mongoose_1.Prop({ type: Date, default: null }),
    __metadata("design:type", Date)
], User.prototype, "protectedAt", void 0);
__decorate([
    mongoose_1.Prop({ type: Date, default: null }),
    __metadata("design:type", Date)
], User.prototype, "bannedAt", void 0);
User = __decorate([
    mongoose_1.Schema({ versionKey: false })
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.UserSchema.index(['_id']);
exports.UserSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
};
exports.UserSchema.pre('save', async function (next) {
    let user = this;
    if (!user.isModified('password') || !user.isNew) {
        next();
    }
    user.password = await bcrypt.hash(user.password, 12);
    next();
});
//# sourceMappingURL=user.js.map