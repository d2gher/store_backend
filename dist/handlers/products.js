"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const store = new products_1.ProductStore();
const index = async (_req, res) => {
    const products = await store.index();
    res.json(products);
};
const show = async (req, res) => {
    const product = await store.show(req.params.id);
    res.json(product);
};
const create = async (req, res) => {
    try {
        const product = {
            id: 0,
            name: req.body.name,
            price: req.body.price,
        };
        const newProduct = await store.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const ProductsRoutes = (app) => {
    app.get("/products", index);
    app.get("/products/:id", show);
    app.post("/products", create);
};
exports.default = ProductsRoutes;
