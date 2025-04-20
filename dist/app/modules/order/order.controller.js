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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const httpStatusCode_1 = require("../../utils/httpStatusCode");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const order_services_1 = require("./order.services");
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_services_1.OrderServices.createOrderIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: httpStatusCode_1.httpStatusCode.OK,
        message: "Order created successfully",
        data: result,
    });
}));
const calculateRevenue = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const totalRevenue = yield order_services_1.OrderServices.calculateTotalRevenue();
    (0, sendResponse_1.default)(res, {
        statusCode: httpStatusCode_1.httpStatusCode.OK,
        message: "Revenue calculated successfully",
        data: {
            totalRevenue,
        },
    });
}));
exports.OrderController = {
    createOrder,
    calculateRevenue,
};
