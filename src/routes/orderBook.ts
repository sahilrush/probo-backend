
import express from 'express';
import { getOrderBook } from '../actions/orderbook';


export const orderBookRouter = express.Router();
orderBookRouter.get('/', getOrderBook)