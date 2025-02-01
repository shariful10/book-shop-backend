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
exports.UserServices = void 0;
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const httpStatusCode_1 = require("../../utils/httpStatusCode");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const createUserIntoDB = (file, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (file) {
        // Send image to Cloudinary
        const imageName = `${payload === null || payload === void 0 ? void 0 : payload.email}${payload === null || payload === void 0 ? void 0 : payload.name}`;
        const path = file === null || file === void 0 ? void 0 : file.path;
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
        payload.profileImg = secure_url;
    }
    const user = yield user_model_1.User.create(payload);
    const jwtPayload = {
        email: payload.email,
        role: payload.role,
    };
    const accessToken = (0, user_utils_1.createToken)(jwtPayload, config_1.default.jwtAccessSecret, { expiresIn: "30d" });
    const refreshToken = (0, user_utils_1.createToken)(jwtPayload, config_1.default.jwtRefreshSecret, { expiresIn: "60d" });
    return {
        user,
        accessToken,
        refreshToken,
    };
});
const getMeFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ email }).select("-password");
    return result;
});
const deleteUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedUser = yield user_model_1.User.findByIdAndDelete(userId);
    if (!deletedUser) {
        throw new AppError_1.default(httpStatusCode_1.httpStatusCode.NOT_FOUND, "User not found");
    }
    return null;
});
exports.UserServices = {
    createUserIntoDB,
    getMeFromDB,
    deleteUserFromDB,
};
