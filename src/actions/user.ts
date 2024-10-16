import { Response, Request } from 'express';
import { USERS, INR_BALANCES } from '../db';

export const createUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    if (USERS[userId]) {
        res.status(409).json({ error: 'User already exists' });
        return;
    }

    USERS[userId] = { userId }; 
    INR_BALANCES[userId] = { balance: 0, locked: 0 }; 

     res.status(201).json({ data: USERS[userId] });
  } catch (error) {
     res.status(500).json({ error: 'An unexpected error occurred' });
  }
};
