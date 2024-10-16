
import  express  from "express";
import { onRamp } from "../actions/onRamp";


export const onRampRouter = express.Router();


onRampRouter.post('/inr',onRamp)