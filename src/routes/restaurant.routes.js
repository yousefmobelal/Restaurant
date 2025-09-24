import { Router } from "express";
import {
  getAllRestaurants,
  getRestaurant,
  createRestaurant,
  addRestaurantToFavorites,
  getRestaurantsWithin,
} from "../controllers/restaurant.controller.js";
import { restrictToAdmin, restrictToUser } from "../middlewares/restrictTo.js";
import { protect } from "../controllers/auth.controller.js";

const router = Router();

router
  .route("/")
  .get(getAllRestaurants)
  .post(protect, restrictToAdmin, createRestaurant);

router
  .route("/:id")
  .get(getRestaurant)
  .post(protect, restrictToUser, addRestaurantToFavorites);

router
  .route("/restaurants-within/:distance/center/:latlng/unit/:unit")
  .get(getRestaurantsWithin);

export default router;
