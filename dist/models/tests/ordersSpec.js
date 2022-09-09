"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../orders");
const products_1 = require("../products");
const users_1 = require("../users");
const store = new orders_1.OrderStore();
const userStore = new users_1.UserStore();
const productStore = new products_1.ProductStore();
beforeAll(async () => {
    const user = {
        id: 0,
        username: "01110",
        firstName: "test",
        lastName: "test's parent",
        password: "123456",
    };
    await userStore.create(user);
    const product = {
        id: 0,
        name: "test",
        price: 0,
    };
    await productStore.create(product);
});
describe("Orders Model", () => {
    it("Check that index method is defined", () => {
        expect(store.index).toBeDefined();
    });
    it("Should return all the orders", async () => {
        const results = await store.index(1);
        expect(results).toEqual([]);
    });
    it("Check that create method is defined", () => {
        expect(store.create).toBeDefined();
    });
    it("Should create a new order", async () => {
        const newOrder = await store.create(1);
        const order = {
            id: 1,
            user_id: 1,
        };
        // @ts-ignore
        expect(newOrder.id).toEqual(order.id);
    });
    it("Check that show method is defined", () => {
        expect(store.show).toBeDefined();
    });
    it("Should get us one order", async () => {
        const order = await store.show(1);
        // @ts-ignore
        expect(order.id).toEqual(1);
    });
    it("Check that addProduct method is defined", () => {
        expect(store.addProduct).toBeDefined();
    });
    it("Should add product to order", async () => {
        const newProduct = await store.addProduct(1, 1, 10);
        expect(newProduct.id).toEqual(1);
    });
    it("Check that getProducts method is defined", () => {
        expect(store.getProducts).toBeDefined();
    });
    it("Should get us products in an order", async () => {
        const orderProducts = await store.getProducts(1, 1);
        expect(orderProducts[0].id).toEqual(1);
    });
});
