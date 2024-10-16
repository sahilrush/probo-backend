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
exports.onRamp = void 0;
const db_1 = require("../db");
const onRamp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, amount } = req.body;
    const balance = db_1.INR_BALANCES;
    try {
        if (!balance[userId]) {
            res.status(404).json({
                error: "User not found"
            });
        }
        const amount_Rs = amount / 100;
        if (amount_Rs < 0) {
            res.status(400).json({
                error: "invalid amount"
            });
        }
        balance[userId].balance += amount_Rs;
        res.status(200).json({
            message: `${amount_Rs} addded succesfully`, data: balance[userId]
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: "unexpected error"
        });
    }
});
exports.onRamp = onRamp;
