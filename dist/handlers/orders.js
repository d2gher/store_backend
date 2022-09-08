"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const verifyToken_1 = __importDefault(require("../utiles/verifyToken"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const store = new orders_1.OrderStore();
const index = async (_req, res) => {
    try {
        const orders = await store.index();
        res.json(orders);
    }
    catch (err) {
        res.status(401);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const order = await store.show(parseInt(req.params.id));
        res.json(order);
    }
    catch (err) {
        res.status(401);
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const token = req.headers["authorization"];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        // @ts-ignore
        const newOrder = await store.create(parseInt(decoded.user));
        res.json(newOrder);
    }
    catch (err) {
        res.status(401);
        res.json(err);
    }
};
const getProducts = async (req, res) => {
    try {
        const token = req.headers["authorization"];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        const order_products = await store.getProducts(parseInt(req.params.id), 
        // @ts-ignore
        parseInt(decoded.user));
        res.json(order_products);
    }
    catch (err) {
        res.status(401);
        res.json(err);
    }
};
const addProduct = async (req, res) => {
    try {
        const order_id = parseInt(req.params.id);
        const product_id = parseInt(req.body.product_id);
        const quantity = parseInt(req.body.quantity);
        const newOrderProduct = await store.addProduct(order_id, product_id, quantity);
        res.json(newOrderProduct);
    }
    catch (err) {
        res.status(401);
        res.json(err);
    }
};
const OrdersRoutes = (app) => {
    app.get("/orders", index);
    app.post("/orders", verifyToken_1.default, create);
    app.get("/orders/:id", show);
    // add product to order
    app.get("/orders/:id/products", verifyToken_1.default, getProducts);
    app.post("/orders/:id/products", verifyToken_1.default, addProduct);
};
exports.default = OrdersRoutes;
