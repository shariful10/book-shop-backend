"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT || 5000,
    databaseUrl: process.env.DATABASE_URL,
    defaultPassword: process.env.DEFAULT_PASS,
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    cloudinaryAPIKey: process.env.CLOUDINARY_API_KEY,
    bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS,
    jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryAPISecret: process.env.CLOUDINARY_API_SECRET,
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    superAdminPassword: process.env.SUPER_ADMIN_PASSWORD,
    sender_email: process.env.SENDER_EMAIL,
    sender_app_password: process.env.SENDER_APP_PASS,
    ssl: {
        store_name: process.env.STORE_NAME,
        payment_api: process.env.PAYMENT_API,
        validation_api: process.env.VALIDATION_API,
        store_id: process.env.STORE_ID,
        store_pass: process.env.STORE_PASSWORD,
        validation_url: process.env.VALIDATION_URL,
        success_url: process.env.SUCCESS_URL,
        failed_url: process.env.FAILED_URL,
        cancel_url: process.env.CANCEL_URL,
    },
};
