import catchAsync from "../utils/catchAsync.js";
import Restaurant from "../models/Restaurant.js";
import AppError from "../utils/appError.js";
import Food from "../models/Food.js";

export const getAllFoods = catchAsync(async (req, res, next) => {
  const foods = await Food.find();
  res.status(200).json({ status: "success", data: foods });
});

export const getFood = catchAsync(async (req, res, next) => {
  const food = await Food.findById(req.params.id);
  if (!food) return next(new AppError("No food found with this ID", 404));

  res.status(200).json({ status: "success", data: food });
});

export const createFood = catchAsync(async (req, res, next) => {
  const { name, image, description, price, restaurant } = req.body;

  const restaurantDoc = await Restaurant.findById(restaurant);
  if (!restaurantDoc)
    return next(new AppError("No restaurant found with this ID", 404));

  const food = await Food.create({
    name,
    image,
    description,
    price,
    restaurant,
  });

  restaurantDoc.foods.push(food._id);
  await restaurantDoc.save();

  res.status(201).json({ status: "success", data: food });
});

export const updateFood = catchAsync(async (req, res, next) => {
  const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!food) return next(new AppError("No food found with this ID", 404));

  res.status(200).json({ status: "success", data: food });
});

export const deleteFood = catchAsync(async (req, res, next) => {
  const food = await Food.findByIdAndDelete(req.params.id);
  if (!food) return next(new AppError("No food found with this ID", 404));

  await Restaurant.findByIdAndUpdate(food.restaurant, {
    $pull: { foods: food._id },
  });

  res.status(204).json({ status: "success", data: null });
});

export const addFoodToCart = catchAsync(async (req, res, next) => {
  const food = await Food.findById(req.params.id);
  if (!food) return next(new AppError("No food found with this ID", 404));
  const user = req.user;

  user.cart.push(food._id);

  await user.save();

  res.status(200).json({ status: "success", data: user.cart });
});
