import Client from "../../database";
import { Order, OrderStore } from "../orders";
import { Product, ProductStore } from "../products";
import { User, UserStore } from "../users";

const store = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

beforeAll(async () => {
  const user: User = {
    id: 0,
    username: "01110",
    firstName: "test",
    lastName: "test's parent",
    password: "123456",
  };
  await userStore.create(user);

  const product: Product = {
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
    const results = await store.index();
    expect(results).toEqual([]);
  });

  it("Check that create method is defined", () => {
    expect(store.create).toBeDefined();
  });

  it("Should create a new order", async () => {
    const newOrder = await store.create(1);
    const order: Order = {
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
