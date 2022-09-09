import Client from "../database";

export type Product = {
  id: number;
  name: string;
  price: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM products";
      const results = await conn.query(sql);
      conn.release();
      return results.rows;
    } catch (err) {
      throw new Error(`An error occured during fetching products. ${err}`);
    }
  }

  async show(id: string | number): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM products WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`An error occured during fetching product. ${err}`);
    }
  }

  async create(name: string, price: number): Promise<Product> {
    const conn = await Client.connect();
    const sql =
      "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *";
    const result = await conn.query(sql, [name, price]);
    conn.release();
    return result.rows[0];
  }
}
