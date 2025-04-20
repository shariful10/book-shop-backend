"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationSchema = void 0;
const zod_1 = require("zod");
const productValidationSchema = zod_1.z.object({
    product: zod_1.z.string(),
    quantity: zod_1.z.number().int().min(1, "Quantity must be at least 1"),
    totalPrice: zod_1.z.number().min(0, "Total price must be non-negative"),
});
exports.orderValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.string(),
        products: zod_1.z.array(productValidationSchema),
        totalAmount: zod_1.z
            .number({
            required_error: "Total price is required",
            invalid_type_error: "Total price must be a number",
        })
            .min(0, "Total price must be non-negative"),
    }),
});
