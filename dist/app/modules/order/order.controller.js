"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const zod_1 = require("zod");
const order_services_1 = require("./order.services");
const order_validation_1 = require("./order.validation");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract order data
        const orderData = req.body;
        // Validate the order data using Zod
        const zodParseData = order_validation_1.orderValidationSchema.parse(orderData);
        // Create a new order in the database
        const result = yield order_services_1.OrderServices.createOrderIntoDB(zodParseData);
        res.status(200).json({
            message: "Order created successfully",
            success: true,
            data: result,
        });
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            const formattedErrors = err.issues.reduce((acc, issue) => {
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
        }
        else if (err instanceof Error && err.message === "Insufficient stock") {
            res.status(400).json({
                message: "Insufficient stock",
                success: false,
                error: err instanceof Error ? err.message : "Something went wrong",
            });
        }
        else {
            res.status(500).json({
                message: "Something went wrong",
                success: false,
                error: err,
            });
        }
    }
});
const calculateRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Calculate the total revenue from all orders
        const totalRevenue = yield order_services_1.OrderServices.calculateTotalRevenue();
        res.status(200).json({
            message: "Revenue calculated successfully",
            status: true,
            data: {
                totalRevenue,
            },
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Order not found",
            success: false,
            error: err,
        });
    }
});
exports.OrderController = {
    createOrder,
    calculateRevenue,
};
