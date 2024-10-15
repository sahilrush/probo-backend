import { Request,Response } from "express"
import { ORDERBOOK } from "../db"



export const getorderBook = async(req:Request, res:Response) => {
    try{
        res.status(400).json({
        data: ORDERBOOK
        })
        return;
    }catch(err) {
        err:"an unexxpe"
    }
}