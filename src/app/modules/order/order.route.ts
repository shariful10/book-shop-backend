import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { OrderController } from "./order.controller";
import { orderValidationSchema } from "./order.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(orderValidationSchema),
  OrderController.createOrder,
);
router.get("/revenue", OrderController.calculateRevenue);

export const OrderRoutes = router;
