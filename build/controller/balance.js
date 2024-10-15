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
exports.getStockBalanceAll = exports.getStockBalance = exports.getBalanceAll = exports.getBalance = void 0;
const db_1 = require("../db");
const getBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        if (!db_1.INR_BALANCES[userId]) {
            res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ data: db_1.INR_BALANCES[userId] });
    }
    catch (error) {
        res.status(500).json({ error: "An unexpected error occured" });
    }
});
exports.getBalance = getBalance;
const getBalanceAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            data: db_1.INR_BALANCES
        });
    }
    catch (error) {
        res.status(500).json({
            error: "An unexpected error occured"
        });
    }
});
exports.getBalanceAll = getBalanceAll;
const getStockBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        if (!db_1.STOCK_BALANCES[userId]) {
            res.status(404).json({
                error: "User Not Found"
            });
            res.status(200).json({
                data: db_1.STOCK_BALANCES[userId]
            });
        }
    }
    catch (error) {
        res.status(500).json({
            error: "An unexpected error occured"
        });
    }
});
exports.getStockBalance = getStockBalance;
const getStockBalanceAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            data: db_1.STOCK_BALANCES
        });
    }
    catch (error) {
        res.status(500).json({
            error: "An unexpected error occured"
        });
    }
});
exports.getStockBalanceAll = getStockBalanceAll;
