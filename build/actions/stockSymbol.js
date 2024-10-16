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
exports.createSymbol = void 0;
const db_1 = require("../db");
const createSymbol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { stockSymbol } = req.params;
    try {
        if (!stockSymbol) {
            res.status(400).json({
                msg: "Symbol Required"
            });
        }
        if (db_1.STOCK_SYMBOLS[stockSymbol]) {
            res.status(400).json({
                msg: "Symbol is Already taken"
            });
        }
        db_1.STOCK_SYMBOLS[stockSymbol] = { stockSymbol };
        res.status(200).json({
            msg: `${stockSymbol} has been created`,
            data: db_1.STOCK_SYMBOLS[stockSymbol]
        });
    }
    catch (error) {
        res.status(500).json({
            error: "An Unexpected Error Occurred"
        });
    }
});
exports.createSymbol = createSymbol;
