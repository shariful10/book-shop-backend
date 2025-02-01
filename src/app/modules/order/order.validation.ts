import { Types } from "mongoose";
import { z } from "zod";

export const orderValidationSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("Email must be in email format")
    .trim(),
  product: z.custom<Types.ObjectId>((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  }),
  quantity: z
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .int()
    .min(1, "Quantity must be at least 1"),
  totalPrice: z
    .number({
      required_error: "Total price is required",
      invalid_type_error: "Total price must be a number",
    })
    .min(0, "Total price must be non-negative"),
});
