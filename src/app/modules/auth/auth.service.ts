import config from "../../config";
import AppError from "../../errors/AppError";
import { httpStatusCode } from "../../utils/httpStatusCode";
import { validateUser } from "../../utils/validateUser";
import { User } from "../user/user.model";
import { createToken, verifyToken } from "../user/user.utils";
import { TLoginUser } from "./auth.interface";

const loginUser = async (payload: TLoginUser) => {
  const user = await validateUser(payload?.email);

  // Checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user.password))) {
    // Access granted: Send Access token & Refresh token
    throw new AppError(httpStatusCode.FORBIDDEN, "Password is incorrect!");
  }

  // Create token and send it to the client
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwtAccessSecret as string,
    { expiresIn: "10s" },
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwtRefreshSecret as string,
    { expiresIn: "30d" },
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  // Check if the token is valid
  const decoded = verifyToken(token, config.jwtRefreshSecret as string);

  const { email, iat } = decoded;

  const user = await validateUser(email);

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatusCode.UNAUTHORIZE, "You are not authorized");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwtAccessSecret as string,
    { expiresIn: "30d" },
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
  refreshToken,
};
