import catchAsync from "../../utils/catchAsync";
import { httpStatusCode } from "../../utils/httpStatusCode";
import sendResponse from "../../utils/sendResponse";
import { BookServices } from "./book.service";

// Create a book
const createBook = catchAsync(async (req, res) => {
  const result = await BookServices.createBookIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatusCode.OK,
    message: "Book is created successfully!",
    data: result,
  });
});

// Get all books
const getAllBooks = catchAsync(async (req, res) => {
  const searchTerm = req.query.searchTerm as string;

  // Retrieve books from the database
  const result = await BookServices.getAllBooksFromDB(searchTerm);

  sendResponse(res, {
    statusCode: httpStatusCode.OK,
    message: "Books are retrieved successfully!",
    data: result,
  });
});

// Get a specific book
const getSingleBook = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const result = await BookServices.getSingleBookFromDB(productId);

  sendResponse(res, {
    statusCode: httpStatusCode.OK,
    message: "Book is retrieved successfully!",
    data: result,
  });
});

// Update a book
const updateBook = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const result = await BookServices.updateBookIntoDB(productId, req.body);

  sendResponse(res, {
    statusCode: httpStatusCode.OK,
    message: "Book is updated successfully",
    data: result,
  });
});

// Delete a book
const deleteBook = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const result = await BookServices.deleteBookFromDB(productId);

  sendResponse(res, {
    statusCode: httpStatusCode.OK,
    message: "Book is deleted successfully",
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
