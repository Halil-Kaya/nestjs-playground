"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TryCatch = void 0;
const TryCatch = (errorHandler) => {
    return (target, propertyKey, descriptor) => {
        const orginalMethod = descriptor.value;
        descriptor.value = function (...args) {
            try {
                const result = orginalMethod.apply(this, args);
                if (result && result instanceof Promise) {
                    return result.catch((err) => {
                        if (errorHandler) {
                            errorHandler(err);
                        }
                        throw err;
                    });
                }
            }
            catch (err) {
                if (errorHandler) {
                    errorHandler(err);
                }
                throw err;
            }
        };
        return descriptor;
    };
};
exports.TryCatch = TryCatch;
//# sourceMappingURL=try-catch.decorator.js.map