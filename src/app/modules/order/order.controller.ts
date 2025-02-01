/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { ZodError } from "zod";
import { OrderServices } from "./order.services";
import { orderValidationSchema } from "./order.validation";

const createOrder = async (req: Request, res: Response) => {
  try {
    // Extract order data
    const orderData = req.body;

    // Validate the order data using Zod
    const zodParseData = orderValidationSchema.parse(orderData);

    // Create a new order in the database
    const result = await OrderServices.createOrderIntoDB(zodParseData);

    res.status(200).json({
      message: "Order created successfully",
      success: true,
      data: result,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      const formattedErrors = err.issues.reduce((acc: any, issue) => {
        acc[issue.path[0]] = {
          message: issue.message,
          name: "ZodError",
          properties: {
            message: issue.message,
            type: issue.code,
            min: 0,
          },
          kind: issue.code,
          path: issue.path[0],
        };
        return acc;
      }, {});

      res.status(500).json({
        message: "Validation failed",
        success: false,
        error: {
          name: "ZodError",
          errors: formattedErrors,
        },
        stack: err.stack,
      });
    } else if (err instanceof Error && err.message === "Insufficient stock") {
      res.status(400).json({
        message: "Insufficient stock",
        success: false,
        error: err instanceof Error ? err.message : "Something went wrong",
      });
    } else {
      res.status(500).json({
        message: "Something went wrong",
        success: false,
        error: err,
      });
    }
  }
};

const calculateRevenue = async (req: Request, res: Response) => {
  try {
    // Calculate the total revenue from all orders
    const totalRevenue = await OrderServices.calculateTotalRevenue();

    res.status(200).json({
      message: "Revenue calculated successfully",
      status: true,
      data: {
        totalRevenue,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Order not found",
      success: false,
      error: err,
    });
  }
};

export const OrderController = {
  createOrder,
  calculateRevenue,
};
