"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
class BaseError extends Error {
    constructor(status = 400, message = 'ERRORS.UNEXPECTED', innerException = null) {
        super();
        this.status = status;
        this.message = message;
        this.innerException = innerException;
        Error.apply(this, arguments);
    }
}
exports.BaseError = BaseError;
//# sourceMappingURL=base.error.js.map