import { Request, Response, Application, request } from "express";
import { User, UserStore } from "../models/users";

const Store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users = await Store.index();
  res.json(users);
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    user_id: 0,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  };

  const newUser = await Store.create(user);
  res.json(newUser);
};

const UsersRoutes = (app: Application) => {
  app.get("/users", index);
  app.post("/users", create);
};

export default UsersRoutes;
