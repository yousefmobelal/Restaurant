import catchAsync from "../utils/catchAsync.js";
import Restaurant from "../models/Restaurant.js";
import User from "../models/User.js";

export const getAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.find();
  res.status(200).json({ status: "success", data: restaurants });
});
export const getRestaurant = catchAsync(async (req, res, next) => {
  const id = req.params;
  const restaurant = await Restaurant.findById(id);
  if (!restaurant) {
    return next(new AppError("No restaurant found with this ID", 404));
  }
  res.status(200).json({ status: "success", data: restaurant });
});
export const createRestaurant = catchAsync(async (req, res, next) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    description: req.body.description,
    categories: req.body.categories,
    location: req.body.location,
  });

  res.status(201).json({ status: "success", data: restaurant });
});
export const addRestaurantToFavorites = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.id);
  user.favourites.push();
});
export const getRestaurantsWithin = catchAsync(async (req, res, next) => {});
