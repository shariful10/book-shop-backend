import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const createToken = (
  jwtPayload: {
    name: string;
    email: string;
    role: string;
    profileImg?: string;
  },
  secret: string,
  expiresIn: SignOptions = {},
) => {
  return jwt.sign(jwtPayload, secret, expiresIn);
};

export const verifyToken = (token: string, secret: string): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};
