import { Book } from "../book/book.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

// Create order and update stock & quantity
const createOrderIntoDB = async (orderData: TOrder): Promise<TOrder> => {
  // Find the book by ID within the session
  const session = await Order.startSession();
  session.startTransaction();

  try {
    if (orderData.products) {
      for (const product of orderData.products) {
        const book = await Book.findById(product.product).session(session);

        // Check the book is in stock or not
        if (book && book.quantity < product.quantity) {
          throw new Error("Insufficient stock for product: " + book.title);
        }

        // Update the stock and quantity
        if (book) {
          book.quantity -= product.quantity;
          if (book.quantity === 0) {
            book.inStock = false;
          }
          await book.save({ session });
        }
      }
    }

    // Create a new order with the provided data
    const order = new Order(orderData);

    // Save the order within the session
    const result = await order.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return result;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

// Calculate total revenue
const calculateTotalRevenue = async (): Promise<number> => {
  const result = await Order.aggregate([
    {
      // Lookup to join orders with books collection
      $lookup: {
        from: "books",
        localField: "product",
        foreignField: "_id",
        as: "bookDetails",
      },
    },
    {
      // Unwind the bookDetails array to deconstruct the array field
      $unwind: "$bookDetails",
    },
    {
      // Group by null to calculate the total revenue
      $group: {
        _id: null,
        totalRevenue: {
          // Sum the product of book price and quantity ordered
          $sum: {
            $multiply: ["$bookDetails.price", "$quantity"],
          },
        },
      },
    },
  ]);

  // Return the total revenue or 0
  return result[0]?.totalRevenue || 0;
};

export const OrderServices = {
  createOrderIntoDB,
  calculateTotalRevenue,
};
