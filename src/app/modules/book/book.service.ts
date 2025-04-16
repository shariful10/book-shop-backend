import QueryBuilder from "../../builder/QueryBuilder";
import { bookSearchableFields } from "./book.const";
import { TBook } from "./book.interface";
import { Book } from "./book.model";

// create a book
const createBookIntoDB = async (payload: TBook) => {
  const result = await Book.create(payload);
  return result;
};

// Get all books
const getAllBooksFromDB = async (query: Record<string, unknown>) => {
  const { minPrice, maxPrice, ...pQuery } = query;

  // Execute the query to find matching books
  const bookQuery = new QueryBuilder(
    Book.find().populate({
      path: "author",
      select: "-password",
    }),
    pQuery,
  )
    .search(bookSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()
    .priceRange(Number(minPrice) || 0, Number(maxPrice) || Infinity);

  const meta = await bookQuery.countTotal();
  const result = await bookQuery.modelQuery.lean();

  return {
    meta,
    result,
  };
};

// Get a specific book
const getSingleBookFromDB = async (id: string): Promise<TBook | null> => {
  const book = await Book.findById(id).populate({
    path: "author",
    select: "-password",
  });

  // Check the book is exists or not
  if (!book) {
    throw new Error("Book not found");
  }
  return book;
};

// Update a book
const updateBookIntoDB = async (
  id: string,
  updateData: Partial<TBook>,
): Promise<TBook | null> => {
  const updatedBook = await Book.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  // Check the book is exists or not
  if (!updatedBook) {
    throw new Error("Book not found");
  }

  return updatedBook;
};

// Delete a book
const deleteBookFromDB = async (id: string): Promise<TBook | null> => {
  const deletedBook = await Book.findByIdAndDelete(id);

  // Check the book is exists or not
  if (!deletedBook) {
    throw new Error("Book not found");
  }

  return deletedBook;
};

export const BookServices = {
  createBookIntoDB,
  getAllBooksFromDB,
  getSingleBookFromDB,
  updateBookIntoDB,
  deleteBookFromDB,
};
