import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthController } from "./auth.controller";
import { AuthValidations } from "./auth.validation";

const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthValidations.loginValidationSchema),
  AuthController.loginUser,
);

// router.post(
//   "/change-password",
//   auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user),
//   validateRequest(AuthValidations.changePasswordValidationSchema),
//   AuthController.changePassword,
// );

router.post(
  "/refresh-token",
  validateRequest(AuthValidations.refreshTokenValidationSchema),
  AuthController.refreshToken,
);

export const AuthRoutes = router;
