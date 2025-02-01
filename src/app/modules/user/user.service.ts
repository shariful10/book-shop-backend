import config from "../../config";
import { TUploadedFile } from "../../interface/file";
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

export const UserServices = {
  createUserIntoDB,
};
