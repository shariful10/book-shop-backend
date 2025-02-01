"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
router.post("/", book_controller_1.BookController.createBook);
router.get("/", book_controller_1.BookController.getAllBooks);
router.get("/:productId", book_controller_1.BookController.getSingleBook);
router.put("/:productId", book_controller_1.BookController.updateBook);
router.delete("/:productId", book_controller_1.BookController.deleteBook);
exports.BookRoutes = router;
