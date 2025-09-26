import catchAsync from "../utils/catchAsync.js";
import Restaurant from "../models/Restaurant.js";
import User from "../models/User.js";
import Food from "../models/Food.js";

// Get all foods
export const getAllFoods = catchAsync(async (req, res, next) => {
  const foods = await Food.find().populate("restaurant", "name description");
  res
    .status(200)
    .json({ status: "success", results: foods.length, data: foods });
});

// Get a single food by ID
export const getFood = catchAsync(async (req, res, next) => {
  const food = await Food.findById(req.params.id).populate(
    "restaurant",
    "name"
  );
  if (!food) return next(new AppError("No food found with this ID", 404));

  res.status(200).json({ status: "success", data: food });
});

// Create a new food item
export const createFood = catchAsync(async (req, res, next) => {
  const { name, image, description, price, restaurant } = req.body;

  // if restaurant exists or not
  const restaurantDoc = await Restaurant.findById(restaurant);
  if (!restaurantDoc)
    return next(new AppError("No restaurant found with this ID", 404));

  //if not => Create food
  const food = await Food.create({
    name,
    image,
    description,
    price,
    restaurant,
  });

  // Push into restaurant’s foods
  restaurantDoc.foods.push(food._id);
  await restaurantDoc.save();

  res.status(201).json({ status: "success", data: food });
});

//update food
export const updateFood = catchAsync(async (req, res, next) => {
  const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!food) return next(new AppError("No food found with this ID", 404));

  res.status(200).json({ status: "success", data: food });
});

// Delete food
export const deleteFood = catchAsync(async (req, res, next) => {
  const food = await Food.findByIdAndDelete(req.params.id);
  if (!food) return next(new AppError("No food found with this ID", 404));

  // Remove reference from restaurant
  await Restaurant.findByIdAndUpdate(food.restaurant, {
    $pull: { foods: food._id },
  });

  res
    .status(200)
    .json({ status: "success", message: "Food deleted successfully" });
});
