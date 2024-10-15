"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockSymbolRouter = void 0;
const express_1 = __importDefault(require("express"));
const stockSymbol_1 = require("../actions/stockSymbol");
exports.stockSymbolRouter = express_1.default.Router();
exports.stockSymbolRouter.post('/create/:stockSymbol', stockSymbol_1.createSymbol);
