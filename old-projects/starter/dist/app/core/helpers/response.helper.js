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
exports.ResponseHelper = void 0;
const common_1 = require("@nestjs/common");
const response_interface_1 = require("../../interfaces/response.interface");
let ResponseHelper = class ResponseHelper {
    constructor() { }
    set(status, data, meta = null) {
        return {
            data: data,
            meta: Object.assign({ status, timestamp: new Date(), size: this.getSize(data) }, meta)
        };
    }
    getSize(data) {
        return ((data instanceof Array) ? data.length : (!data ? 0 : 1));
    }
};
ResponseHelper = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], ResponseHelper);
exports.ResponseHelper = ResponseHelper;
//# sourceMappingURL=response.helper.js.map