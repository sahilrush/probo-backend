"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mintTokens = exports.sellNo = exports.buyNo = exports.sellYes = exports.buyYes = void 0;
const db_1 = require("../db");
const placeOrder = (type, option) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { userId, stockSymbol, quantity, price } = req.body;
        if (!db_1.INR_BALANCES[userId]) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!db_1.ORDERBOOK[stockSymbol]) {
            return res.status(404).json({ message: "Stock symbol not found" });
        }
        const totalCost = quantity * price;
        if (type === 'buy' && db_1.INR_BALANCES[userId].balance < totalCost) {
            return res.status(400).json({ message: "Insufficient balance" });
        }
        if (type === 'sell' && (!((_b = (_a = db_1.STOCK_BALANCES[userId]) === null || _a === void 0 ? void 0 : _a[stockSymbol]) === null || _b === void 0 ? void 0 : _b[option]) ||
            db_1.STOCK_BALANCES[userId][stockSymbol][option].quantity < quantity)) {
            return res.status(400).json({ message: "Insufficient stock balance" });
        }
        if (!db_1.ORDERBOOK[stockSymbol][option][price]) {
            db_1.ORDERBOOK[stockSymbol][option][price] = { total: 0, orders: {} };
        }
        db_1.ORDERBOOK[stockSymbol][option][price].total += quantity;
        db_1.ORDERBOOK[stockSymbol][option][price].orders[userId] =
            (db_1.ORDERBOOK[stockSymbol][option][price].orders[userId] || 0) + quantity;
        if (type === 'buy') {
            db_1.INR_BALANCES[userId].locked += totalCost;
            db_1.INR_BALANCES[userId].balance -= totalCost;
        }
        else {
            if (!db_1.STOCK_BALANCES[userId][stockSymbol]) {
                db_1.STOCK_BALANCES[userId][stockSymbol] = { yes: { quantity: 0, locked: 0 }, no: { quantity: 0, locked: 0 } };
            }
            db_1.STOCK_BALANCES[userId][stockSymbol][option].locked += quantity;
            db_1.STOCK_BALANCES[userId][stockSymbol][option].quantity -= quantity;
        }
        return res.status(200).json({ message: "Order placed successfully", data: db_1.ORDERBOOK[stockSymbol] });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An unexpected error occurred" });
    }
});
exports.buyYes = placeOrder('buy', 'yes');
exports.sellYes = placeOrder('sell', 'yes');
exports.buyNo = placeOrder('buy', 'no');
exports.sellNo = placeOrder('sell', 'no');
const mintTokens = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, stockSymbol, quantity } = req.body;
        if (!db_1.INR_BALANCES[userId]) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!db_1.STOCK_BALANCES[userId]) {
            db_1.STOCK_BALANCES[userId] = {};
        }
        if (!db_1.STOCK_BALANCES[userId][stockSymbol]) {
            db_1.STOCK_BALANCES[userId][stockSymbol] = { yes: { quantity: 0, locked: 0 }, no: { quantity: 0, locked: 0 } };
        }
        db_1.STOCK_BALANCES[userId][stockSymbol].yes.quantity += quantity;
        db_1.STOCK_BALANCES[userId][stockSymbol].no.quantity += quantity;
        return res.status(200).json({
            message: `${quantity} tokens minted successfully for ${stockSymbol}`,
            data: db_1.STOCK_BALANCES[userId][stockSymbol]
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An unexpected error occurred" });
    }
});
exports.mintTokens = mintTokens;
