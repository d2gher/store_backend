"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const verifyToken_1 = __importDefault(require("../utiles/verifyToken"));
const store = new products_1.ProductStore();
const index = async (_req, res) => {
    try {
        const products = await store.index();
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const product = await store.show(req.params.id);
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const product = {
            id: 0,
            name: req.body.name,
            price: parseInt(req.body.price),
        };
        if (!product.name || !product.price) {
            throw new Error("Please enter the required params");
        }
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
    app.post("/products", verifyToken_1.default, create);
};
exports.default = ProductsRoutes;
