import  express  from "express";
import { getBalance, getBalanceAll, getStockBalance, getStockBalanceAll } from "../actions/balance";



export const balancesDataRouter = express.Router();
balancesDataRouter.get('/balances/inr/:userId', getBalance )
balancesDataRouter.get('/balances/inr', getBalanceAll)
balancesDataRouter.get('/balances/stock/:userId' ,getStockBalance)
balancesDataRouter.get('/balances/stock', getStockBalanceAll)