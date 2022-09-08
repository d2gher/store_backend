"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const request = (0, supertest_1.default)(server_1.default);
describe("Server test", () => {
    it("Test if the '/' endpoint works", async () => {
        const res = await request.get("/");
        expect(res.statusCode).toBe(200);
    });
});
