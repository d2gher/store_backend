"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Give us access to the enviroment varibles
dotenv_1.default.config();
const pepper = process.env.BCRYPT_PASSWORD;
const salt = process.env.SALT_ROUNDS;
class UserStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM users";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could get users. ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM users WHERE id=($1)";
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Couldn't get user. ${err}`);
        }
    }
    async create(user) {
        try {
            const conn = await database_1.default.connect();
            const sql = "INSERT INTO users (username, firstname, lastname, password) VALUES ($1, $2, $3, $4) RETURNING *";
            // Hash password
            const hash = bcrypt_1.default.hashSync(user.password + pepper, parseInt(salt));
            const result = await conn.query(sql, [
                user.username,
                user.firstName,
                user.lastName,
                hash,
            ]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Couldn't create user. ${err}`);
        }
    }
    async authenticate(username, password) {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM users WHERE username=($1)";
            const result = await conn.query(sql, [username]);
            if (result.rows.length) {
                const user = result.rows[0];
                if (bcrypt_1.default.compareSync(password + pepper, user.password)) {
                    return user;
                }
            }
            return null;
        }
        catch (err) {
            throw new Error(`Couldn't login. ${err}`);
        }
    }
}
exports.UserStore = UserStore;
