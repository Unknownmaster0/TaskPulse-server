import { Router } from "express";
import { inputValidationMiddleware } from "../middleware/input-validation.middleware.js";
import signup from "../controllers/signup.js";

const router = Router();

router.route("/signup").post(inputValidationMiddleware, signup);

export default router;