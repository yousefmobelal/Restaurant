import { Router } from "express";
import {
  getAllRestaurants,
  getRestaurant,
  createRestaurant,
  addRestaurantToFavorites,
  getRestaurantsWithin,
  addFoodToRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurant.controller.js";
import { restrictToAdmin, restrictToUser } from "../middlewares/restrictTo.js";
import { protect } from "../controllers/auth.controller.js";
import ajvMiddleware from "../middlewares/ajv.middleware.js";
import restaurantSchema from "../utils/restaurant.validator.js";

const router = Router();

router
  .route("/")
  .get(getAllRestaurants)
  .post(
    protect,
    restrictToAdmin,
    ajvMiddleware(restaurantSchema),
    createRestaurant
  );

//Todo: fisish implementing after creating food model
router.post(
  "/:restaurantId/add-food/:foodId",
  protect,
  restrictToAdmin,
  addFoodToRestaurant
);

router.post("/:id/favorite", protect, restrictToUser, addRestaurantToFavorites);

router.get("/nearby", protect, getRestaurantsWithin);

router
  .route("/:id")
  .get(getRestaurant)
  .patch(protect, restrictToAdmin, updateRestaurant)
  .delete(protect, restrictToAdmin, deleteRestaurant);

export default router;
