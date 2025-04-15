import { Types } from "mongoose";

export type TCategory =
  | "Fiction"
  | "Science"
  | "SelfDevelopment"
  | "Poetry"
  | "Religious";

export type TBook = {
  title: string;
  author: Types.ObjectId;
  price: number;
  thumbnail: string;
  category: TCategory;
  description: string;
  quantity: number;
  inStock: boolean;
};
