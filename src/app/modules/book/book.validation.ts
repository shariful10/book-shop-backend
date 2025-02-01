import { z } from "zod";

// Category schema for zod validation
export const categoryValidationSchema = z.enum([
  "Fiction",
  "Science",
  "SelfDevelopment",
  "Poetry",
  "Religious",
]);

// Book schema for zod validation
export const bookValidationSchema = z.object({
  title: z
    .string({
      required_error: "Title is required.",
      invalid_type_error: "Title must be a string",
    })
    .min(1, "Title is required."),
  author: z
    .string({
      required_error: "Author is required.",
      invalid_type_error: "Author must be a string",
    })
    .min(1, "Author is required."),
  price: z
    .number({
      required_error: "Price is required.",
      invalid_type_error: "Price must be a number",
    })
    .positive("Price must be a positive number."),
  category: categoryValidationSchema,
  description: z
    .string({
      required_error: "Description is required.",
      invalid_type_error: "Description must be a string",
    })
    .min(1, "Description is required."),
  quantity: z
    .number({
      required_error: "Quantity is required.",
      invalid_type_error: "Quantity must be a number",
    })
    .int()
    .nonnegative("Quantity must be a non-negative integer."),
  inStock: z.boolean({
    required_error: "In stock is required.",
    invalid_type_error: "In stock must be a boolean",
  }),
});
