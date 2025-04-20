import { Types } from "mongoose";
import { TPayment } from "../payment/payment.interface";

export type TOrderProduct = {
  product: Types.ObjectId;
  quantity: number;
  totalPrice: number;
};

export interface TOrder extends TOrderProduct {
  user: Types.ObjectId;
  products: TOrderProduct[];
  totalAmount: number;
  status: "Pending" | "Processing" | "Completed" | "Cancelled";
  paymentMethod: "Cash" | "Card" | "Online";
  paymentStatus: "Pending" | "Paid" | "Failed";
  payment?: TPayment | null;
}
