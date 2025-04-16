import QueryBuilder from "../../builder/QueryBuilder";
import config from "../../config";
import AppError from "../../errors/AppError";
import { httpStatusCode } from "../../utils/httpStatusCode";
import { userSearchableFields } from "./user.const";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { createToken } from "./user.utils";

const createUserIntoDB = async (payload: TUser) => {
  await User.create(payload);

  const jwtPayload = {
    name: payload.name,
    email: payload.email,
    role: payload.role,
    profileImg: payload.profileImg,
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

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find().select("-password"), query)
    .search(userSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await userQuery.countTotal();
  const result = await userQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getMeFromDB = async (email: string) => {
  const result = await User.findOne({ email }).select("-password");
  return result;
};

const deleteUserFromDB = async (userId: string) => {
  const deletedUser = await User.findByIdAndDelete(userId);

  if (!deletedUser) {
    throw new AppError(httpStatusCode.NOT_FOUND, "User not found");
  }

  return null;
};

export const UserServices = {
  createUserIntoDB,
  getMeFromDB,
  deleteUserFromDB,
  getAllUsersFromDB,
};
