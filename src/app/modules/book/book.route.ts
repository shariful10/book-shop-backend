import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../user/user.const";
import { BookController } from "./book.controller";
import { BookValidations } from "./book.validation";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(BookValidations.createBookValidationSchema),
  BookController.createBook,
);

router.get("/", BookController.getAllBooks);

router.get("/:productId", BookController.getSingleBook);

router.put(
  "/:productId",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(BookValidations.updateBookValidationSchema),
  BookController.updateBook,
);

router.delete(
  "/:productId",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  BookController.deleteBook,
);

export const BookRoutes = router;
