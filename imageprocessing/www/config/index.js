"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Node Imports
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Constants
const config = {
    PORT: process.env.PORT,
    BACKEND_SERVER: process.env.BACKEND_SERVER
};
// Export
exports.default = config;
//# sourceMappingURL=index.js.map