import config from "../../config";
import AppError from "../../errors/AppError";
import { TUploadedFile } from "../../interface/file";
import { httpStatusCode } from "../../utils/httpStatusCode";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { createToken } from "./user.utils";

const createUserIntoDB = async (file: TUploadedFile, payload: TUser) => {
  if (file) {
    // Send image to Cloudinary
    const imageName = `${payload?.email}${payload?.name}`;
    const path = file?.path;

    const { secure_url } = await sendImageToCloudinary(imageName, path);

    payload.profileImg = secure_url as string;
  }

  const user = await User.create(payload);

  const jwtPayload = {
    email: payload.email,
    role: payload.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwtAccessSecret as string,
    { expiresIn: "30d" },
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwtRefreshSecret as string,
    { expiresIn: "60d" },
  );

  return {
    user,
    accessToken,
    refreshToken,
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
};
