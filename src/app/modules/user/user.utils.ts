import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const createToken = (
  jwtPayload: { email: string; role: string },
  secret: string,
  expiresIn: SignOptions = {},
) => {
  return jwt.sign(
    jwtPayload,
    secret,
    expiresIn, // Explicitly cast expiresIn to string, number, or undefined
  );
};

export const verifyToken = (token: string, secret: string): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};
