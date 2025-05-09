import { Schema, model } from "mongoose";
import { TBook } from "./book.interface";

const bookSchema = new Schema<TBook>(
  {
    title: { type: String, required: true, trim: true },
    author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ["Fiction", "Science", "SelfDevelopment", "Poetry", "Religious"],
      required: true,
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    thumbnail: { type: String, default: "" },
  },
  {
    timestamps: true,
  },
);

export const Book = model<TBook>("Book", bookSchema);
