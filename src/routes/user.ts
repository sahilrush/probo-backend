import express from "express"

import { createUser } from "../actions/user";
const userRouter = express.Router();
userRouter.post('/create/:userId', createUser)

export default userRouter