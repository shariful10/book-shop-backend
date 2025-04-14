"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_const_1 = require("../user/user.const");
const book_controller_1 = require("./book.controller");
const book_validation_1 = require("./book.validation");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(user_const_1.USER_ROLE.superAdmin, user_const_1.USER_ROLE.admin), (0, validateRequest_1.default)(book_validation_1.BookValidations.createBookValidationSchema), book_controller_1.BookController.createBook);
router.get("/", book_controller_1.BookController.getAllBooks);
router.get("/:productId", book_controller_1.BookController.getSingleBook);
router.put("/:productId", (0, auth_1.default)(user_const_1.USER_ROLE.superAdmin, user_const_1.USER_ROLE.admin), (0, validateRequest_1.default)(book_validation_1.BookValidations.updateBookValidationSchema), book_controller_1.BookController.updateBook);
router.delete("/:productId", (0, auth_1.default)(user_const_1.USER_ROLE.superAdmin, user_const_1.USER_ROLE.admin), book_controller_1.BookController.deleteBook);
exports.BookRoutes = router;
