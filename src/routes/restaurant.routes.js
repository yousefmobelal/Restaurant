import { Router } from "express";
import {
  getAllRestaurants,
  getRestaurant,
  createRestaurant,
  addRestaurantToFavorites,
  getRestaurantsWithin,
  addFoodToRestaurant,
} from "../controllers/restaurant.controller.js";
import { restrictToAdmin, restrictToUser } from "../middlewares/restrictTo.js";
import { protect } from "../controllers/auth.controller.js";

const router = Router();

router
  .route("/")
  .get(getAllRestaurants)
  .post(protect, restrictToAdmin, createRestaurant);

//Todo: fisish implementing after creating food model
router.post(
  "/:restaurantId/add-food/:foodId",
  protect,
  restrictToAdmin,
  addFoodToRestaurant
);

router.post("/:id/favorite", protect, restrictToUser, addRestaurantToFavorites);

router.get("/nearby", protect, getRestaurantsWithin);

router.get("/:id", getRestaurant);

export default router;
