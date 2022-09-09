import { Product, ProductStore } from "../products";

const store = new ProductStore();

describe("Products Model", () => {
  it("Check that index method is defined ", () => {
    expect(store.index).toBeDefined();
  });

  it("Should return to us the products table rows", async () => {
    const results = await store.index();
    expect(results.length).toEqual(2);
  });

  it("Check that show method is defined ", () => {
    expect(store.create).toBeDefined();
  });

  it("Should return to us the products table rows", async () => {
    const results = await store.create("test", 1);
    expect(`${JSON.stringify(results)}`).toEqual(
      `{"id":3,"name":"test","price":1}`
    );
  });

  it("Check that show method is defined ", () => {
    expect(store.show).toBeDefined();
  });

  it("Should return to us a product", async () => {
    const results = await store.show(2);
    expect(`${JSON.stringify(results)}`).toEqual(
      `{"id":2,"name":"test","price":1}`
    );
  });
});
