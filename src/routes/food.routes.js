import { Router } from "express";
import {
  getAllFoods,
  getFood,
  createFood,
  updateFood,
  deleteFood,
} from "../controllers/food.controller.js";
import { restrictToAdmin, restrictToUser } from "../middlewares/restrictTo.js";
import { protect } from "../controllers/auth.controller.js";

const router = Router();

router.route("/").get(getAllFoods).post(protect, restrictToAdmin, createFood);

router
  .route("/:id")
  .get(getFood)
  .patch(protect, restrictToAdmin, updateFood)
  .delete(protect, restrictToAdmin, deleteFood);

export default router;
