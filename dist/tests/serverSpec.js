"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const request = (0, supertest_1.default)(server_1.default);
const token = {
    authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoyLCJpYXQiOjE2NjI3MzgzODh9.N3JPmhIhmwE6yo-0_CwqUfjL4NlJzdncRyzszd59JaY",
    "Content-Type": "application/json",
};
describe("/ Endpoints", () => {
    it("Test if the '/' endpoint works", async () => {
        const res = await request.get("/");
        expect(res.statusCode).toBe(200);
    });
});
describe("/users Endpoints", () => {
    it("Test if the '/users' endpoint works", async () => {
        const res = await request.get("/users").set(token);
        expect(res.statusCode).toBe(200);
    });
    it("Test if the '/users' endpoint sends err for not providing token.", async () => {
        const res = await request.get("/users");
        expect(res.statusCode).toBe(401);
    });
    it("Test if the '/users/1' endpoint works", async () => {
        const res = await request.get("/users").set(token);
        expect(res.statusCode).toBe(200);
    });
    it("Test if the '/users/1' endpoint sends err for not providing token", async () => {
        const res = await request.get("/users");
        expect(res.statusCode).toBe(401);
    });
    it("Test if the '/users' post endpoint works", async () => {
        const res = await request.post("/users").send({
            username: "1",
            firstName: "test",
            lastName: "test",
            password: "123456",
        });
        expect(res.statusCode).toBe(200);
    });
    it("Test if the '/users' post endpoint sends err for not providing token", async () => {
        const res = await request.post("/users");
        expect(res.statusCode).toBe(401);
    });
});
describe("/products Endpoints", () => {
    it("Test if the '/products' endpoint works", async () => {
        const res = await request.get("/products");
        expect(res.statusCode).toBe(200);
    });
    it("Test if the '/products' endpoint works", async () => {
        const res = await request.get("/products/1");
        expect(res.statusCode).toBe(200);
    });
    it("Test if the '/products' post endpoint works", async () => {
        const res = await request.post("/products").set(token).send({
            name: "test",
            price: 1,
        });
        expect(res.statusCode).toBe(200);
    });
    it("Test if the '/products' post endpoint sends err for not providing token", async () => {
        const res = await request.post("/products");
        expect(res.statusCode).toBe(401);
    });
});
describe("/orders Endpoints", () => {
    it("Test if the '/orders' endpoint sends err for not providing token", async () => {
        const res = await request.get("/orders");
        expect(res.statusCode).toBe(401);
    });
});
