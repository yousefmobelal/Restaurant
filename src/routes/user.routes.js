import { Router } from "express";
import { signup, login } from "../controllers/auth.controller.js";
import signupSchema from "../utils/signup.validator.js";
import ajvMiddleware from "../middlewares/ajv.middleware.js";

const router = Router();

router.post("/signup", ajvMiddleware(signupSchema), signup);
router.post("/login", login);

export default router;
