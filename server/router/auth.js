import { Router } from "express";
import authController from "../controller/auth.js";
import { validErrorsMiddlware } from "../middlewares/validationErrors.js";
import { registerValidation } from "../validations/user.js";

const router = Router();

router.post(
  "/register",
  registerValidation,
  validErrorsMiddlware,
  authController.register
);

router.post("/login", authController.login);
router.post("/logout", authController.logout);
export { router };
