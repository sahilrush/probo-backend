import { INR_BALANCES, ORDERBOOK } from '../db';
import { Request, Response } from 'express';

const checkBalance = (userId: string, amount: number) => {
    const userBalance = INR_BALANCES[userId];
    return userBalance && userBalance.balance >= amount;
};

 export const buyYesOption = async (req: Request, res: Response) => {
    const { userId, stockSymbol, quantity, price } = req.body;
    const totalCost = quantity * price;

    if (!checkBalance(userId, totalCost)) {
        return res.status(400).json({ error: 'Insufficient balance.' });
    }

    
    INR_BALANCES[userId].balance -= totalCost;

    if (!ORDERBOOK[stockSymbol]) {
        ORDERBOOK[stockSymbol] = { yes: {}, no: {} };
    }

    if (!ORDERBOOK[stockSymbol].yes[price.toString()]) {
        ORDERBOOK[stockSymbol].yes[price.toString()] = { total: 0, orders: {} };
    }

    ORDERBOOK[stockSymbol].yes[price.toString()].total += quantity;
    ORDERBOOK[stockSymbol].yes[price.toString()].orders[userId] = 
        (ORDERBOOK[stockSymbol].yes[price.toString()].orders[userId] || 0) + quantity;

    return res.status(200).json({ message: 'Yes option bought successfully.' });
};



export const buyNoOption = async (req:Request, res:Response) => {
    const {userId,stockSymbol,quantity,price} = req.body;   
    const totalCost = quantity * price;


    if(!checkBalance(userId,totalCost)) {
        return res.status(400).json({
            error:"Insufficient balance"    
        })

    }
    INR_BALANCES[userId].balance -= totalCost;

    if(!ORDERBOOK[stockSymbol]) {
        ORDERBOOK[stockSymbol] = {yes:{}, no : {}};
    }
}




//////wrtiting the sell yes option

export const sellYesOption = async (req: Request, res: Response) => {
    const { userId, stockSymbol, quantity, price } = req.body;

    if (!ORDERBOOK[stockSymbol] || !ORDERBOOK[stockSymbol].yes[price.toString()] || !ORDERBOOK[stockSymbol].yes[price.toString()].orders[userId]) {
        return res.status(400).json({ error: 'No such Yes option found for the user.' });
    }

    const userQuantity = ORDERBOOK[stockSymbol].yes[price.toString()].orders[userId];

    if (userQuantity < quantity) {
        return res.status(400).json({ error: 'Insufficient Yes options to sell.' });
    }

    // Deduct the quantity being sold
    ORDERBOOK[stockSymbol].yes[price.toString()].orders[userId] -= quantity;
    ORDERBOOK[stockSymbol].yes[price.toString()].total -= quantity;

    // If the user's quantity is zero, remove the order entry
    if (ORDERBOOK[stockSymbol].yes[price.toString()].orders[userId] === 0) {
        delete ORDERBOOK[stockSymbol].yes[price.toString()].orders[userId];
    }

    // Add the funds back to the user's balance
    const totalProceeds = quantity * price;
    INR_BALANCES[userId].balance += totalProceeds;

    return res.status(200).json({ message: 'Yes option sold successfully.' });
};
