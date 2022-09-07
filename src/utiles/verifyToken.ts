import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    //const authorizationHeader = req.headers[authorization
    const token = req.headers["authorization"] as string;
    jwt.verify(token, process.env.TOKEN_SECRET as string);
    next();
  } catch (err) {
    res.status(401);
    res.send(err);
  }
};

export default verifyToken;
