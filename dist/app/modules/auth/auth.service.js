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
exports.AuthServices = void 0;
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const httpStatusCode_1 = require("../../utils/httpStatusCode");
const validateUser_1 = require("../../utils/validateUser");
const user_model_1 = require("../user/user.model");
const user_utils_1 = require("../user/user.utils");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, validateUser_1.validateUser)(payload === null || payload === void 0 ? void 0 : payload.email);
    // Checking if the password is correct
    if (!(yield user_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user.password))) {
        // Access granted: Send Access token & Refresh token
        throw new AppError_1.default(httpStatusCode_1.httpStatusCode.FORBIDDEN, "Password is incorrect!");
    }
    // Create token and send it to the client
    const jwtPayload = {
        name: user.name,
        email: user.email,
        role: user.role,
        profileImg: user.profileImg,
    };
    const accessToken = (0, user_utils_1.createToken)(jwtPayload, config_1.default.jwtAccessSecret, { expiresIn: "30d" });
    return {
        accessToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the token is valid
    const decoded = (0, user_utils_1.verifyToken)(token, config_1.default.jwtRefreshSecret);
    const { email, iat } = decoded;
    const user = yield (0, validateUser_1.validateUser)(email);
    if (user.passwordChangedAt &&
        user_model_1.User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat)) {
        throw new AppError_1.default(httpStatusCode_1.httpStatusCode.UNAUTHORIZE, "You are not authorized");
    }
    const jwtPayload = {
        name: user.name,
        email: user.email,
        role: user.role,
        profileImg: user.profileImg,
    };
    const accessToken = (0, user_utils_1.createToken)(jwtPayload, config_1.default.jwtAccessSecret, { expiresIn: "30d" });
    return {
        accessToken,
    };
});
exports.AuthServices = {
    loginUser,
    refreshToken,
};
