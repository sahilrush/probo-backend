
import express from 'express';
import { Request, Response } from 'express';
import { getorderBook } from '../actions/orderbook';




export const orderBookRouter = express.Router();
orderBookRouter.get('/', getorderBook)