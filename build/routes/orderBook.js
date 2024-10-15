"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderBookRouter = void 0;
const express_1 = __importDefault(require("express"));
const orderbook_1 = require("../actions/orderbook");
exports.orderBookRouter = express_1.default.Router();
exports.orderBookRouter.get('/', orderbook_1.getorderBook);
