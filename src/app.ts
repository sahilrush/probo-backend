
import express from "express";
import userRouter from "./routes/user";
import { stockSymbolRouter } from "./routes/stockSymbol";
import { orderBookRouter } from "./routes/orderBook";
import { balancesDataRouter } from "./routes/balance";
import { onRampRouter } from "./routes/onRamp";
import { createMintRouter } from "./routes/createMint";
import bodyParser from "body-parser";

const app = express();

app.use(express.json());
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send("Options Trading App");
});

app.use('/api/v1/user', userRouter);
app.use('/api/v1/stock', stockSymbolRouter)
app.use('/api/v1/orderbook', orderBookRouter)
app.use('api/v1', balancesDataRouter)
app.use('api/v1,', onRampRouter)
app.use('',createMintRouter)


export default app;
