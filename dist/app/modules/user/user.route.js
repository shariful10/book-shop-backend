"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_const_1 = require("./user.const");
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(user_validation_1.UserValidations.CreateUserValidationSchema), user_controller_1.userController.createUser);
router.get("/", user_controller_1.userController.getAllUsers);
router.get("/me/:email", user_controller_1.userController.getMe);
router.delete("/:userId", (0, auth_1.default)(user_const_1.USER_ROLE.superAdmin, user_const_1.USER_ROLE.admin), user_controller_1.userController.deleteUser);
exports.UserRoutes = router;
