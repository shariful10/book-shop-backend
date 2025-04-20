"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.EmailHelper = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = __importStar(require("fs"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const path = __importStar(require("path"));
const config_1 = __importDefault(require("../config"));
const Util = require("util");
const ReadFile = Util.promisify(fs.readFile);
const Handlebars = require("handlebars");
const sendEmail = (email, html, subject, attachment) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: config_1.default.sender_email,
                pass: config_1.default.sender_app_password,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        // Email configuration
        const mailOptions = {
            from: '"Koparion" <support@koparion.com>',
            to: email,
            subject,
            html,
        };
        if (attachment) {
            mailOptions.attachments = [
                {
                    filename: attachment.filename,
                    content: attachment.content,
                    encoding: attachment.encoding,
                },
            ];
        }
        // Sending the email
        const info = yield transporter.sendMail(mailOptions);
        console.log("Email sent:", info.messageId);
        return info;
    }
    catch (err) {
        console.error("Error sending email:", err);
        throw new Error("Failed to send email");
    }
});
const createEmailContent = (data, templateType) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const templatePath = path.join(process.cwd(), `/src/templates/${templateType}.template.hbs`);
        const content = yield ReadFile(templatePath, "utf8");
        const template = Handlebars.compile(content);
        return template(data);
    }
    catch (err) {
        console.log(err);
    }
});
exports.EmailHelper = {
    sendEmail,
    createEmailContent,
};
