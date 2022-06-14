"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemSchema = void 0;
const mongoose = require("mongoose");
exports.ItemSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    qty: Number
});
//# sourceMappingURL=item.schema.js.map