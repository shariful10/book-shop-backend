"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const httpStatusCode_1 = require("../../utils/httpStatusCode");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const user_service_1 = require("./user.service");
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserServices.createUserIntoDB(req.body);
    const { accessToken } = result;
    res.cookie("accessToken", accessToken, {
        secure: true,
        httpOnly: true,
        sameSite: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: httpStatusCode_1.httpStatusCode.CREATED,
        message: "User is created successfully!",
        data: {
            accessToken: accessToken,
        },
    });
}));
// Get all books
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Retrieve users from the database
    const result = yield user_service_1.UserServices.getAllUsersFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: httpStatusCode_1.httpStatusCode.OK,
        message: "Books are retrieved successfully!",
        meta: result.meta,
        data: result.result,
    });
}));
const getMe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const result = yield user_service_1.UserServices.getMeFromDB(email);
    (0, sendResponse_1.default)(res, {
        statusCode: httpStatusCode_1.httpStatusCode.OK,
        message: "User is retrieved successfully",
        data: result,
    });
}));
const deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield user_service_1.UserServices.deleteUserFromDB(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: httpStatusCode_1.httpStatusCode.OK,
        message: "User is deleted successfully",
        data: result,
    });
}));
exports.userController = {
    getMe,
    createUser,
    deleteUser,
    getAllUsers,
};
