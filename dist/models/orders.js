"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async index(user_id) {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM orders where user_id=($1) AND status='active'";
            const results = await conn.query(sql, [user_id]);
            conn.release();
            return results.rows;
        }
        catch (err) {
            throw new Error(`An error occured during fetching orders. ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM ORDERS WHERE id=($1)";
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`An error occured during fetching order. ${err}`);
        }
    }
    async create(user_id) {
        try {
            const conn = await database_1.default.connect();
            const sql = "INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *";
            const result = await conn.query(sql, [user_id, "active"]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`An error occured during creating order. ${err}`);
        }
    }
    async getProducts(order_id, user_id) {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM orders_products INNER JOIN orders ON orders_products.order_id = orders.id WHERE orders_products.order_id=($1) AND orders.user_id=($2)";
            const resutls = await conn.query(sql, [order_id, user_id]);
            conn.release();
            return resutls.rows;
        }
        catch (err) {
            throw new Error(`An error occured during getting order products. ${err}`);
        }
    }
    async addProduct(order_id, product_id, quantity) {
        try {
            const conn = await database_1.default.connect();
            const sql = "INSERT INTO orders_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *";
            const result = await conn.query(sql, [order_id, product_id, quantity]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`An error occured during adding product to order. ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
