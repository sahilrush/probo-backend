import { Request, Response } from "express";
import { ORDERBOOK } from "../db";

export const getOrderBook = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      data: ORDERBOOK
    });
    return;
  } catch (err) {
    res.status(500).json({
      error: "An unexpected error occurred",
    });
  }
};
