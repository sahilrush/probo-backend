import { Request, Response } from "express";
import { STOCK_SYMBOLS } from "../db";

export const createSymbol = async (req: Request, res: Response) => {
    const { stockSymbol } = req.params; 
    try {
        if (!stockSymbol) {
            res.status(400).json({
                msg: "Symbol Required" 
            });
            return; 
        }

        if (STOCK_SYMBOLS[stockSymbol]) {
            res.status(400).json({
                msg: "Symbol is Already taken" 
            });
            return;
        }

        STOCK_SYMBOLS[stockSymbol] = { stockSymbol }; 
        res.status(200).json({
            msg: `${stockSymbol} has been created`, 
            data: STOCK_SYMBOLS[stockSymbol] 
        });

    } catch (error) {
        res.status(500).json({
            error: "An Unexpected Error Occurred" 
        });
    }
};
