import { User, UserStore } from "../users";

const store = new UserStore();

describe("Users Model", () => {
  it("Shoud have index method", () => {
    expect(store.index).toBeDefined();
  });

  it("Should get us a list of the users", async () => {
    const results = await store.index();
    expect(results).toEqual([]);
  });
});
