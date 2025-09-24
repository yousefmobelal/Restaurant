import { Router } from "express";
import { signup, login, protect } from "../controllers/auth.controller.js";
import signupSchema from "../utils/signup.validator.js";
import ajvMiddleware from "../middlewares/ajv.middleware.js";
import { getUser, updateUser } from "../controllers/user.controller.js";

const router = Router();

router.post("/signup", ajvMiddleware(signupSchema), signup);
router.post("/login", login);

router.use(protect);

router.get("/:id", getUser);
router.patch("/", updateUser);

export default router;
