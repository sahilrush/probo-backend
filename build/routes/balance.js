"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.balancesDataRouter = void 0;
const express_1 = __importDefault(require("express"));
const balance_1 = require("../actions/balance");
exports.balancesDataRouter = express_1.default.Router();
exports.balancesDataRouter.get('/inr/:userId', balance_1.getBalance);
exports.balancesDataRouter.get('/inr', balance_1.getBalanceAll);
exports.balancesDataRouter.get('/stock/:userId', balance_1.getStockBalance);
exports.balancesDataRouter.get('/stock', balance_1.getStockBalanceAll);
