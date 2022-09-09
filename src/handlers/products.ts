import { Request, Response, Application } from "express";
import { Product, ProductStore } from "../models/products";
import verifyToken from "../utiles/verifyToken";

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    if (!req.body.name || !parseInt(req.body.price)) {
      console.log("yay");
      throw new Error("Please enter the required params");
    }

    const newProduct = await store.create(
      req.body.name,
      parseInt(req.body.price)
    );
    res.json(newProduct);
  } catch (err) {
    res.status(401);
    res.json(err);
  }
};
const ProductsRoutes = (app: Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", verifyToken, create);
};

export default ProductsRoutes;
