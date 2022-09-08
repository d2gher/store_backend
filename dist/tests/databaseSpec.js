"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
describe("Test database connection", () => {
    it("See if connection is made", async () => {
        const conn = await database_1.default.connect();
        expect(conn).toBeTruthy();
        conn.release();
    });
});
