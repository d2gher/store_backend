import Client from "../database";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

// Give us access to the enviroment varibles
dotenv.config();
const pepper = process.env.BCRYPT_PASSWORD;
const salt = process.env.SALT_ROUNDS as string;

export type User = {
  id: number;
  username: string;
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
      console.log(result.rows[0]);
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
        "INSERT INTO users (username, firstname, lastname, password) VALUES ($1, $2, $3, $4) RETURNING *";
      // Hash password
      const hash = bcrypt.hashSync(user.password + pepper, parseInt(salt));

      const result = await conn.query(sql, [
        user.username,
        user.firstName,
        user.lastName,
        hash,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't create user. ${err}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await Client.connect();
    const sql = "SELECT * FROM users WHERE username=($1)";

    const result = await conn.query(sql, [username]);
    if (result.rows.length) {
      const user = result.rows[0];

      if (bcrypt.compareSync(password + pepper, user.password)) {
        return user;
      }
    }

    return null;
  }
}
