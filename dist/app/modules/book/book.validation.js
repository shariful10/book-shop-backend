"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookValidationSchema = exports.categoryValidationSchema = void 0;
const zod_1 = require("zod");
// Category schema for zod validation
exports.categoryValidationSchema = zod_1.z.enum([
    "Fiction",
    "Science",
    "SelfDevelopment",
    "Poetry",
    "Religious",
]);
// Book schema for zod validation
exports.bookValidationSchema = zod_1.z.object({
    title: zod_1.z
        .string({
        required_error: "Title is required.",
        invalid_type_error: "Title must be a string",
    })
        .min(1, "Title is required."),
    author: zod_1.z
        .string({
        required_error: "Author is required.",
        invalid_type_error: "Author must be a string",
    })
        .min(1, "Author is required."),
    price: zod_1.z
        .number({
        required_error: "Price is required.",
        invalid_type_error: "Price must be a number",
    })
        .positive("Price must be a positive number."),
    category: exports.categoryValidationSchema,
    description: zod_1.z
        .string({
        required_error: "Description is required.",
        invalid_type_error: "Description must be a string",
    })
        .min(1, "Description is required."),
    quantity: zod_1.z
        .number({
        required_error: "Quantity is required.",
        invalid_type_error: "Quantity must be a number",
    })
        .int()
        .nonnegative("Quantity must be a non-negative integer."),
    inStock: zod_1.z.boolean({
        required_error: "In stock is required.",
        invalid_type_error: "In stock must be a boolean",
    }),
});
