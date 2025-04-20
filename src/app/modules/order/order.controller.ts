import catchAsync from "../../utils/catchAsync";
import { httpStatusCode } from "../../utils/httpStatusCode";
import sendResponse from "../../utils/sendResponse";
import { OrderServices } from "./order.services";

const createOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.createOrderIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatusCode.OK,
    message: "Order created successfully",
    data: result,
  });
});

const calculateRevenue = catchAsync(async (req, res) => {
  const totalRevenue = await OrderServices.calculateTotalRevenue();

  sendResponse(res, {
    statusCode: httpStatusCode.OK,
    message: "Revenue calculated successfully",
    data: {
      totalRevenue,
    },
  });
});

export const OrderController = {
  createOrder,
  calculateRevenue,
};
