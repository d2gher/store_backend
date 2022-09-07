import { Request, Response, Application, request } from "express";
import { User, UserStore } from "../models/users";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import verifyToken from "../utiles/verifyToken";

dotenv.config();

const Store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users = await Store.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  const user = await Store.show(req.params.id);
  if (!user) {
    res.json("couldn't find user");
  }
  res.json(user);
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    id: 0,
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  };

  try {
    const newUser = await Store.create(user);
    const token = jwt.sign(
      { user: newUser.id },
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json((err as string) + user);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const user = await Store.authenticate(req.body.username, req.body.password);
    if (user) {
      const token = jwt.sign(
        { user: user },
        process.env.TOKEN_SECRET as string
      );
      res.json(token);
    } else {
      res.status(401);
      res.json("Couldn't verify user");
    }
  } catch (err) {
    res.status(401);
    res.json(err);
  }
};

const UsersRoutes = (app: Application) => {
  app.get("/users", verifyToken, index);
  app.get("/users/:id", verifyToken, show);
  app.post("/users", create);
  app.post("/users/authenticate", authenticate);
};

export default UsersRoutes;
