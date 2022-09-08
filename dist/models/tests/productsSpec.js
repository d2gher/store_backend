"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../products");
const store = new products_1.ProductStore();
describe("Products Model", () => {
    it("Check that index method is defined ", () => {
        expect(store.index).toBeDefined();
    });
    it("Should return to us the products table rows", async () => {
        const results = await store.index();
        expect(results.length).toEqual(1);
    });
    it("Check that show method is defined ", () => {
        expect(store.create).toBeDefined();
    });
    it("Should return to us the products table rows", async () => {
        const product = {
            id: 0,
            name: "test",
            price: 0,
        };
        const results = await store.create(product);
        expect(`${JSON.stringify(results)}`).toEqual(`{"id":2,"name":"test","price":0}`);
    });
    it("Check that show method is defined ", () => {
        expect(store.show).toBeDefined();
    });
    it("Should return to us a product", async () => {
        const results = await store.show(2);
        expect(`${JSON.stringify(results)}`).toEqual(`{"id":2,"name":"test","price":0}`);
    });
});
