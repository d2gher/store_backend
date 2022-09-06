import Client from "../database";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

// Give us access to the enviroment varibles
dotenv.config();

export type User = {
  user_id: number;
  firstName: string;
  lastName: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could get users. ${err}`);
    }
  }

  async show(id: string | number): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't get user. ${err}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO users (firstname, lastname, password) VALUES ($1, $2, $3) RETURNING *";
      // Hash password
      console.log(user.firstName);
      const pepper = process.env.BCRYPT_PASSWORD;
      const salt = process.env.SALT_ROUNDS as string;
      const hash = bcrypt.hashSync(user.password + pepper, parseInt(salt));

      const result = await conn.query(sql, [
        user.firstName,
        user.lastName,
        hash,
      ]);
      console.log("yay2");
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't create user. ${err}`);
    }
  }
}
