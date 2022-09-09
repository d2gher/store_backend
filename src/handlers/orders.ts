import { Request, Response, Application } from "express";
import { Order, OrderStore } from "../models/orders";
import verifyToken from "../utiles/verifyToken";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const store = new OrderStore();

const index = async (req: Request, res: Response) => {
  try {
    const token = req.headers["authorization"] as string;
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
    // @ts-ignore
    const orders = await store.index(parseInt(decoded.user));
    res.json(orders);
  } catch (err) {
    res.status(401);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(parseInt(req.params.id));
    res.json(order);
  } catch (err) {
    res.status(401);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const token = req.headers["authorization"] as string;
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
    // @ts-ignore
    const newOrder = await store.create(parseInt(decoded.user));
    res.json(newOrder);
  } catch (err) {
    res.status(401);
    res.json(err);
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const token = req.headers["authorization"] as string;
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);

    const order_products = await store.getProducts(
      parseInt(req.params.id),
      // @ts-ignore
      parseInt(decoded.user)
    );
    res.json(order_products);
  } catch (err) {
    res.status(401);
    res.json(err);
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const order_id: number = parseInt(req.params.id);
    const product_id: number = parseInt(req.body.product_id);
    const quantity: number = parseInt(req.body.quantity);

    const newOrderProduct = await store.addProduct(
      order_id,
      product_id,
      quantity
    );
    res.json(newOrderProduct);
  } catch (err) {
    res.status(401);
    res.json(err);
  }
};

const OrdersRoutes = (app: Application) => {
  app.get("/orders", verifyToken, index);
  app.post("/orders", verifyToken, create);
  app.get("/orders/:id", verifyToken, show);
  // add product to order
  app.get("/orders/:id/products", verifyToken, getProducts);
  app.post("/orders/:id/products", verifyToken, addProduct);
};

export default OrdersRoutes;
