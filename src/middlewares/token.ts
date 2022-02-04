import { IRequestUser } from "../interfaces";
import env from "../environments";
import jwt from "jsonwebtoken";

export const createToken = (user: IRequestUser | undefined, expiresIn = "15m"): string => {
  return jwt.sign({ ...user }, env.JWT_KEY, { expiresIn });
};

export const verifyToken = (token: string, key: string): IRequestUser => {
  return jwt.verify(token, key) as IRequestUser;
};
