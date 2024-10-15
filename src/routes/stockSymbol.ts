import  express  from "express";
import { createSymbol } from "../actions/stockSymbol";


export const stockSymbolRouter = express.Router();

stockSymbolRouter.post('/create/:stockSymbol', createSymbol)

