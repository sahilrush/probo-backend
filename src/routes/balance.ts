import  express  from "express";
import { getBalance, getBalanceAll, getStockBalance, getStockBalanceAll } from "../actions/balance";



export const balancesDataRouter = express.Router();
balancesDataRouter.get('/inr/:userId', getBalance )
balancesDataRouter.get('/inr', getBalanceAll)
balancesDataRouter.get('/stock/:userId' ,getStockBalance)
balancesDataRouter.get('/stock', getStockBalanceAll)