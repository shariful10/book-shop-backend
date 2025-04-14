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
exports.BookController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const httpStatusCode_1 = require("../../utils/httpStatusCode");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const book_service_1 = require("./book.service");
// Create a book
const createBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.BookServices.createBookIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: httpStatusCode_1.httpStatusCode.OK,
        message: "Book is created successfully!",
        data: result,
    });
}));
// Get all books
const getAllBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchTerm = req.query.searchTerm;
    // Retrieve books from the database
    const result = yield book_service_1.BookServices.getAllBooksFromDB(searchTerm);
    (0, sendResponse_1.default)(res, {
        statusCode: httpStatusCode_1.httpStatusCode.OK,
        message: "Books are retrieved successfully!",
        data: result,
    });
}));
// Get a specific book
const getSingleBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const result = yield book_service_1.BookServices.getSingleBookFromDB(productId);
    (0, sendResponse_1.default)(res, {
        statusCode: httpStatusCode_1.httpStatusCode.OK,
        message: "Book is retrieved successfully!",
        data: result,
    });
}));
// Update a book
const updateBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const result = yield book_service_1.BookServices.updateBookIntoDB(productId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: httpStatusCode_1.httpStatusCode.OK,
        message: "Book is updated successfully",
        data: result,
    });
}));
// Delete a book
const deleteBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const result = yield book_service_1.BookServices.deleteBookFromDB(productId);
    (0, sendResponse_1.default)(res, {
        statusCode: httpStatusCode_1.httpStatusCode.OK,
        message: "Book is deleted successfully",
        data: result,
    });
}));
exports.BookController = {
    createBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook,
};
