/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { ZodError } from "zod";
import { BookServices } from "./book.service";
import { bookValidationSchema } from "./book.validation";

// Create a book
const createBook = async (req: Request, res: Response) => {
  try {
    // Extract book data
    const bookData = req.body;

    // Validate the book data using Zod
    const zodParseData = bookValidationSchema.parse(bookData);

    const result = await BookServices.createBookIntoDB(zodParseData);

    res.status(200).json({
      message: "Book created successfully",
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
    } else {
      res.status(500).json({
        message: "Something went wrong",
        success: false,
        error: err,
      });
    }
  }
};

// Get all books
const getAllBooks = async (req: Request, res: Response) => {
  try {
    // Extract search term from query parameters
    const searchTerm = req.query.searchTerm as string;

    // Retrieve books from the database
    const result = await BookServices.getAllBooksFromDB(searchTerm);

    res.status(200).json({
      message: "Books retrieved successfully",
      status: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      message: "Book not found",
      success: false,
      error: err,
    });
  }
};

// Get a specific book
const getSingleBook = async (req: Request, res: Response) => {
  try {
    // Extract productId
    const { productId } = req.params;

    // Retrieve the book from the database using the productId
    const result = await BookServices.getSingleBookFromDB(productId);

    res.status(200).json({
      message: "Book retrieved successfully",
      status: true,
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      message: err instanceof Error ? err.message : "Book not found!",
      status: false,
      error: err,
    });
  }
};

// Update a book
const updateBook = async (req: Request, res: Response) => {
  try {
    // Extract productId
    const { productId } = req.params;

    // Extract update data
    const updateData = req.body;

    // Update the book in the database using the productId and update data
    const result = await BookServices.updateBookIntoDB(productId, updateData);

    res.status(200).json({
      message: "Book updated successfully",
      status: true,
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      message: err instanceof Error ? err.message : "Book not found",
      status: false,
      error: err,
    });
  }
};

// Delete a book
const deleteBook = async (req: Request, res: Response) => {
  try {
    // Extract productId
    const { productId } = req.params;

    // Delete the book from the database using the productId
    await BookServices.deleteBookFromDB(productId);

    res.status(200).json({
      message: "Book deleted successfully",
      status: true,
      data: {},
    });
  } catch (err) {
    res.status(404).json({
      message: err instanceof Error ? err.message : "Book not found",
      status: false,
      error: err,
    });
  }
};

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
