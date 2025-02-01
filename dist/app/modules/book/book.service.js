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
exports.BookServices = void 0;
const book_model_1 = require("./book.model");
// create a book
const createBookIntoDB = (bookData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.create(bookData);
    return result;
});
// Get all books
const getAllBooksFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    // Construct the query based on the search term
    const query = searchTerm
        ? {
            $or: [
                // Search by title, author, or category
                { title: { $regex: searchTerm, $options: "i" } },
                { author: { $regex: searchTerm, $options: "i" } },
                { category: { $regex: searchTerm, $options: "i" } },
            ],
        }
        : {};
    // Execute the query to find matching books
    const result = yield book_model_1.Book.find(query);
    return result;
});
// Get a specific book
const getSingleBookFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(id);
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
