import { INR_BALANCES, ORDERBOOK } from "../db";
import { Request, Response } from 'express';

const processOrder = (req:Request, res:Response) => {
    try {
        const { userId, stockSymbol, quantity, price } = req.body;

        // Calculate the 'no' price based on the input price
        const noPrice = (10 - parseInt(price)).toString();
        const quantityInt = parseInt(quantity);

        // Check if there's already an order for 'no' at the calculated price
        if (ORDERBOOK[stockSymbol]['no'].hasOwnProperty(noPrice)) {
            // Update the existing order for 'no' by the user
            ORDERBOOK[stockSymbol]['no'][noPrice]['orders'][userId] = 
                (ORDERBOOK[stockSymbol]['no'][noPrice]['orders'][userId] || 0) + quantityInt;
            
            // Update the total quantity of 'no' orders
            ORDERBOOK[stockSymbol]['no'][noPrice]['total'] += quantityInt;
        } else {
            // Create a new order entry for 'no' if it doesn't exist
            ORDERBOOK[stockSymbol]['no'][noPrice] = {
                total: quantityInt,
                orders: {
                    [userId]: quantityInt,
                }
            };
        }

        // Calculate the cost and update the user's INR balance
        const cost = parseInt(price) * quantityInt;
        INR_BALANCES[userId]['balance'] -= cost;
        INR_BALANCES[userId]['locked'] += cost;

        // Return a success response
        return { success: true };
    } catch (error) {
        console.error("Error processing the order:", error);
        return { success: false, message: 'An error occurred while processing your order.' };
    }
};

// Example of how you might call this function in the future
// const result = processOrder(req);
// res.status(result.success ? 200 : 500).send(result);
