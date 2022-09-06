"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const Store = new users_1.UserStore();
const index = async (_req, res) => {
    const users = await Store.index();
    res.json(users);
};
const UsersRoutes = (app) => {
    app.get("/users", index);
};
exports.default = UsersRoutes;
