import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import UsersRoutes from "./handlers/users";
import ProductsRoutes from "./handlers/products";
import OrdersRoutes from "./handlers/orders";
import dotenv from "dotenv";

dotenv.config();
const { PORT } = process.env;

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

const corsOptions = {
  origin: "*",
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/", function (_req: Request, res: Response) {
  res.send("Hello World!");
});

UsersRoutes(app);
ProductsRoutes(app);
OrdersRoutes(app);

app.listen(PORT, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
