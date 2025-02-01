/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../errors/AppError";
import { httpStatusCode } from "./httpStatusCode";

export const verifyToken = (token: string, secret: string): JwtPayload => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (err) {
    throw new AppError(httpStatusCode.UNAUTHORIZE, "You are not authorized");
  }
};
