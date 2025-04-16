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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const book_const_1 = require("./book.const");
const book_model_1 = require("./book.model");
// create a book
const createBookIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.create(payload);
    return result;
});
// Get all books
const getAllBooksFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { minPrice, maxPrice } = query, pQuery = __rest(query, ["minPrice", "maxPrice"]);
    // Execute the query to find matching books
    const bookQuery = new QueryBuilder_1.default(book_model_1.Book.find().populate({
        path: "author",
        select: "-password",
    }), pQuery)
        .search(book_const_1.bookSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields()
        .priceRange(Number(minPrice) || 0, Number(maxPrice) || Infinity);
    const meta = yield bookQuery.countTotal();
    const result = yield bookQuery.modelQuery.lean();
    return {
        meta,
        result,
    };
});
// Get a specific book
const getSingleBookFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(id).populate({
        path: "author",
        select: "-password",
    });
    // Check the book is exists or not
    if (!book) {
        throw new Error("Book not found");
    }
    return book;
});
// Update a book
const updateBookIntoDB = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBook = yield book_model_1.Book.findByIdAndUpdate(id, updateData, {
        new: true,
    });
    // Check the book is exists or not
    if (!updatedBook) {
        throw new Error("Book not found");
    }
    return updatedBook;
});
// Delete a book
const deleteBookFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedBook = yield book_model_1.Book.findByIdAndDelete(id);
    // Check the book is exists or not
    if (!deletedBook) {
        throw new Error("Book not found");
    }
    return deletedBook;
});
exports.BookServices = {
    createBookIntoDB,
    getAllBooksFromDB,
    getSingleBookFromDB,
    updateBookIntoDB,
    deleteBookFromDB,
};
