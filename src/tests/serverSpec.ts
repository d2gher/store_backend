import supertest from "supertest";
import app from "../server";

const request = supertest(app);

describe("/ Endpoints", () => {
  it("Test if the '/' endpoint works", async () => {
    const res = await request.get("/");
    expect(res.statusCode).toBe(200);
  });
});

describe("/users Endpoints", () => {
  it("Test if the '/users' endpoint sends err for not providing token", async () => {
    const res = await request.get("/users");
    expect(res.statusCode).toBe(401);
  });

  it("Test if the '/users/1' endpoint sends err for not providing token", async () => {
    const res = await request.get("/users");
    expect(res.statusCode).toBe(401);
  });

  it("Test if the '/users' post endpoint sends err for not providing token", async () => {
    const res = await request.post("/users");
    expect(res.statusCode).toBe(401);
  });
});

describe("/products Endpoints", () => {
  it("Test if the '/products' endpoint sends err for not providing token", async () => {
    const res = await request.get("/products");
    expect(res.statusCode).toBe(200);
  });

  it("Test if the '/products' endpoint sends err for not providing token", async () => {
    const res = await request.get("/products/1");
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
