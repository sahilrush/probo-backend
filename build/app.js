"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/user"));
const stockSymbol_1 = require("./routes/stockSymbol");
const orderBook_1 = require("./routes/orderBook");
const balance_1 = require("./routes/balance");
const onRamp_1 = require("./routes/onRamp");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.send("Options Trading App");
});
app.use('/api/v1/user', user_1.default);
app.use('/api/v1/stock', stockSymbol_1.stockSymbolRouter);
app.use('/api/v1/orderbook', orderBook_1.orderBookRouter);
app.use('/api/v1/balance', balance_1.balancesDataRouter);
app.use('/api/v1/onramp', onRamp_1.onRampRouter);
exports.default = app;
