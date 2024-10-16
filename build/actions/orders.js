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
exports.sellYesOption = exports.buyNoOption = exports.buyYesOption = void 0;
const db_1 = require("../db");
const checkBalance = (userId, amount) => {
    const userBalance = db_1.INR_BALANCES[userId];
    return userBalance && userBalance.balance >= amount;
};
const buyYesOption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, stockSymbol, quantity, price } = req.body;
    const totalCost = quantity * price;
    if (!checkBalance(userId, totalCost)) {
        return res.status(400).json({ error: 'Insufficient balance.' });
    }
    db_1.INR_BALANCES[userId].balance -= totalCost;
    if (!db_1.ORDERBOOK[stockSymbol]) {
        db_1.ORDERBOOK[stockSymbol] = { yes: {}, no: {} };
    }
    if (!db_1.ORDERBOOK[stockSymbol].yes[price.toString()]) {
        db_1.ORDERBOOK[stockSymbol].yes[price.toString()] = { total: 0, orders: {} };
    }
    db_1.ORDERBOOK[stockSymbol].yes[price.toString()].total += quantity;
    db_1.ORDERBOOK[stockSymbol].yes[price.toString()].orders[userId] =
        (db_1.ORDERBOOK[stockSymbol].yes[price.toString()].orders[userId] || 0) + quantity;
    return res.status(200).json({ message: 'Yes option bought successfully.' });
});
exports.buyYesOption = buyYesOption;
const buyNoOption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, stockSymbol, quantity, price } = req.body;
    const totalCost = quantity * price;
    if (!checkBalance(userId, totalCost)) {
        return res.status(400).json({
            error: "Insufficient balance"
        });
    }
    db_1.INR_BALANCES[userId].balance -= totalCost;
    if (!db_1.ORDERBOOK[stockSymbol]) {
        db_1.ORDERBOOK[stockSymbol] = { yes: {}, no: {} };
    }
});
exports.buyNoOption = buyNoOption;
//////wrtiting the sell yes option
const sellYesOption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, stockSymbol, quantity, price } = req.body;
    if (!db_1.ORDERBOOK[stockSymbol] || !db_1.ORDERBOOK[stockSymbol].yes[price.toString()] || !db_1.ORDERBOOK[stockSymbol].yes[price.toString()].orders[userId]) {
        return res.status(400).json({ error: 'No such Yes option found for the user.' });
    }
    const userQuantity = db_1.ORDERBOOK[stockSymbol].yes[price.toString()].orders[userId];
    if (userQuantity < quantity) {
        return res.status(400).json({ error: 'Insufficient Yes options to sell.' });
    }
    // Deduct the quantity being sold
    db_1.ORDERBOOK[stockSymbol].yes[price.toString()].orders[userId] -= quantity;
    db_1.ORDERBOOK[stockSymbol].yes[price.toString()].total -= quantity;
    // If the user's quantity is zero, remove the order entry
    if (db_1.ORDERBOOK[stockSymbol].yes[price.toString()].orders[userId] === 0) {
        delete db_1.ORDERBOOK[stockSymbol].yes[price.toString()].orders[userId];
    }
    // Add the funds back to the user's balance
    const totalProceeds = quantity * price;
    db_1.INR_BALANCES[userId].balance += totalProceeds;
    return res.status(200).json({ message: 'Yes option sold successfully.' });
});
exports.sellYesOption = sellYesOption;
