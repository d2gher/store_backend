import { User, UserStore } from "../users";

const store = new UserStore();

describe("Users Model", () => {
  it("Shoud have index method", () => {
    expect(store.index).toBeDefined();
  });

  it("Should get us a list of the users", async () => {
    const results = await store.index();
    expect(results.length).toEqual(1);
  });

  it("Shoud have create method", () => {
    expect(store.create).toBeDefined();
  });

  it("Should create new user", async () => {
    const user: User = {
      id: 0,
      username: "011101",
      firstName: "test",
      lastName: "test's parent",
      password: "123456",
    };
    const result = await store.create(user);
    expect(`${JSON.stringify(result.id)}`).toEqual("2");
  });

  it("Shoud have show method", () => {
    expect(store.show).toBeDefined();
  });

  it("Should create new user", async () => {
    const result = await store.show(2);
    // @ts-ignore
    expect(`${JSON.stringify(result.id)}`).toEqual("2");
  });
});
