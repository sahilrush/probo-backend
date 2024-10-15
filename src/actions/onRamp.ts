
import { Request, Response } from "express"
import { INR_BALANCES } from "../db"

export const onRamp = async(req:Request, res:Response) => {
    const {userId,amount}   = req.body
    const balance = INR_BALANCES;
    try{
            if(!balance[userId]){
                res.status(404).json({
                    error:"User not found"
                })
            }
            const amount_Rs = amount/1000
            if(amount_Rs<0){
                res.status(400).json({
                    error:"invalid amount"
                })
                balance[userId].balance+=amount_Rs
                res.status(200).json({
                    message: `${amount_Rs} addded succesfully`, data:balance[userId]
                })
            }
    }catch(error) {
        res.status(500).json({
            error:"unexpected error"
        })
    }
}
