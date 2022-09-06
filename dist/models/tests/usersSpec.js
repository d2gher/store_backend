"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../users");
const store = new users_1.UserStore();
describe("Users Model", () => {
    it("Shoud have index method", () => {
        expect(store.index).toBeDefined();
    });
    it("Should get us a list of the users", async () => {
        const results = await store.index();
        expect(results).toEqual([]);
    });
});
