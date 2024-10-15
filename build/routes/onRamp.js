"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onRampRouter = void 0;
const express_1 = __importDefault(require("express"));
const onRamp_1 = require("../actions/onRamp");
exports.onRampRouter = express_1.default.Router();
exports.onRampRouter.post('/onramp/inr', onRamp_1.onRamp);
