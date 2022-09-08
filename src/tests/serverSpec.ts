import supertest from "supertest";
import app from "../server";

const request = supertest(app);

describe("Server test", () => {
  it("Test if the '/' endpoint works", async () => {
    const res = await request.get("/");
    expect(res.statusCode).toBe(200);
  });
});
