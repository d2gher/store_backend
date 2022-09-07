import { Request, Response, Application } from "express";
import { Product, ProductStore } from "../models/products";
import verifyToken from "../utiles/verifyToken";

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

const show = async (req: Request, res: Response) => {
  const product = await store.show(req.params.id);
  res.json(product);
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      id: 0,
      name: req.body.name,
      price: req.body.price,
    };
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const ProductsRoutes = (app: Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", verifyToken, create);
};

export default ProductsRoutes;
