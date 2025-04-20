import { z } from "zod";

const productValidationSchema = z.object({
  product: z.string(),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  totalPrice: z.number().min(0, "Total price must be non-negative"),
});

export const orderValidationSchema = z.object({
  body: z.object({
    user: z.string(),
    products: z.array(productValidationSchema),
    totalAmount: z
      .number({
        required_error: "Total price is required",
        invalid_type_error: "Total price must be a number",
      })
      .min(0, "Total price must be non-negative"),
  }),
});
