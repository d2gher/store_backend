import Client from "../database";

describe("Test database connection", () => {
  it("See if connection is made", async () => {
    const conn = await Client.connect();
    expect(conn).toBeTruthy();
    conn.release();
  });
});
