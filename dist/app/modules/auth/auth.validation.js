"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidations = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        })
            .email({ message: "Email must be in a email format" }),
        password: zod_1.z.string({
            required_error: "Password is required",
            invalid_type_error: "Password must be a string",
        }),
    }),
});
const refreshTokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: "Refresh token is required!",
        }),
    }),
});
exports.AuthValidations = {
    loginValidationSchema,
    refreshTokenValidationSchema,
};
