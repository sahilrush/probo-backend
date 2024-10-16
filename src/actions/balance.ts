import { Response, Request } from "express";
import { INR_BALANCES, STOCK_BALANCES } from "../db"; 

export const getBalance = async (req: Request, res: Response) => {
  const { userId } = req.params; 
  try{
    if (!INR_BALANCES[userId]) {
        res.status(404).json({error : "User not found"})
      }
    res.status(200).json({data : INR_BALANCES[userId]});
  } catch (error) {
    res.status(500).json({error: "An unexpected error occured"})
  }
}


export const getBalanceAll = async(req:Request , res: Response) => {
    try{
        
        res.status(200).json({
            data:INR_BALANCES
        })

    } catch(error) {
        res.status(500).json({
            error:"An unexpected error occured"
        })
    }
}



  export const getStockBalance = async(req:Request , res:Response) => {
    const {userId} = req.params;
    try{
            if(!STOCK_BALANCES[userId]) {
                res.status(404).json({
                    error: "User Not Found"
                })
                 res.status(200).json({
                    data: STOCK_BALANCES[userId]
                })
            }
    }catch(error) {
        res.status(500).json({
            error: "An unexpected error occured"
        })
    }
  }

export const getStockBalanceAll = async(req:Request, res:Response) => {

    try{
        res.status(200).json({
            data: STOCK_BALANCES

        })
    }catch(error) {
        res.status(500).json({
            error : "An unexpected error occured"
        })
    }

}





