import catchAsync from "../../utils/catchAsync";
import { httpStatusCode } from "../../utils/httpStatusCode";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);

  const { refreshToken, accessToken, user } = result;

  // res
  //   .cookie("refreshToken", refreshToken, {
  //     secure: true,
  //     httpOnly: true,
  //     sameSite: "none",
  //     maxAge: 1000 * 60 * 60 * 24 * 365,
  //   })
  //   .status(httpStatusCode.CREATED)
  //   .json({
  //     statusCode: httpStatusCode.CREATED,
  //     message: "User is created successfully!",
  //     data: {
  //       user: user,
  //       accessToken: accessToken,
  //     },
  //   });

  res.cookie("refreshToken", refreshToken, {
    secure: true,
    httpOnly: true,
    sameSite: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: httpStatusCode.CREATED,
    message: "User is created successfully!",
    data: {
      user: user,
      accessToken: accessToken,
    },
  });
});

// Get all books
const getAllUsers = catchAsync(async (req, res) => {
  // Retrieve users from the database
  const result = await UserServices.getAllUsersFromDB();

  sendResponse(res, {
    statusCode: httpStatusCode.OK,
    message: "Books are retrieved successfully!",
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { email } = req.params;

  const result = await UserServices.getMeFromDB(email as string);

  sendResponse(res, {
    statusCode: httpStatusCode.OK,
    message: "User is retrieved successfully",
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserServices.deleteUserFromDB(userId);

  sendResponse(res, {
    statusCode: httpStatusCode.OK,
    message: "User is deleted successfully",
    data: result,
  });
});

export const userController = {
  getMe,
  createUser,
  deleteUser,
  getAllUsers,
};
