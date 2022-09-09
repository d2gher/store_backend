"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const verifyToken_1 = __importDefault(require("../utiles/verifyToken"));
dotenv_1.default.config();
const Store = new users_1.UserStore();
const index = async (_req, res) => {
    try {
        const users = await Store.index();
        res.json(users);
    }
    catch (err) {
        res.status(401);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const user = await Store.show(req.params.id);
        res.json(user);
    }
    catch (err) {
        res.status(401);
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const user = {
            id: 0,
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
        };
        if (!user.username || !user.firstName || !user.lastName || !user.password) {
            throw new Error("Please enter the required params");
        }
        const newUser = await Store.create(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser.id }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(401);
        res.json(err);
    }
};
const authenticate = async (req, res) => {
    try {
        const user = await Store.authenticate(req.body.username, req.body.password);
        if (user) {
            const token = jsonwebtoken_1.default.sign({ user: user }, process.env.TOKEN_SECRET);
            res.json(token);
        }
        else {
            res.status(401);
            res.json("Couldn't verify user");
        }
    }
    catch (err) {
        res.status(401);
        res.json(err);
    }
};
const UsersRoutes = (app) => {
    app.get("/users", verifyToken_1.default, index);
    app.get("/users/:id", verifyToken_1.default, show);
    app.post("/users", create);
    app.post("/users/authenticate", authenticate);
};
exports.default = UsersRoutes;
