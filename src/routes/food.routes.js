import { Router } from "express";
import {
  getAllFoods,
  getFood,
  createFood,
  updateFood,
  deleteFood,
} from "../controllers/food.controller.js";
import { restrictToAdmin } from "../middlewares/restrictTo.js";
import { protect } from "../controllers/auth.controller.js";
import ajvMiddleware from "../middlewares/ajv.middleware.js";
import foodSchema from "../utils/food.validator.js";

const router = Router();

router
  .route("/")
  .get(getAllFoods)
  .post(protect, restrictToAdmin, ajvMiddleware(foodSchema), createFood);

router
  .route("/:id")
  .get(getFood)
  .patch(protect, restrictToAdmin, updateFood)
  .delete(protect, restrictToAdmin, deleteFood);

export default router;
