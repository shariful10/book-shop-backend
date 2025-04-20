import { Types } from "mongoose";

export interface TPayment {
  user: Types.ObjectId;
  order: Types.ObjectId;
  method: "COD" | "Online";
  status: "Pending" | "Paid" | "Failed";
  transactionId?: string;
  amount: number;
  gatewayResponse?: Record<string, unknown>;
  createdAt?: Date;
  updatedAt?: Date;
}
