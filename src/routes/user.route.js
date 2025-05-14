import { Router } from "express";
import { SignupinputValidationMiddleware } from "../middleware/SignupInput-validation.middleware.js";
import SignupController from "../controllers/signup.js";
import { LoginInputValidationMiddleware } from "../middleware/LoginInput-valdiationMiddleware.js";
import LoginController from "../controllers/login.js";

const router = Router();

router.route("/signup").post(SignupinputValidationMiddleware, SignupController);
router.route("/login").post(LoginInputValidationMiddleware, LoginController);

export default router;