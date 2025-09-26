import catchAsync from "../utils/catchAsync.js";
import Restaurant from "../models/Restaurant.js";
import User from "../models/User.js";
import AppError from "../utils/appError.js";

export const getAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.find();
  res.status(200).json({ status: "success", data: restaurants });
});

export const deleteRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findByIdAndDelete(id);

  if (!restaurant) {
    return next(new AppError("No restaurant found with this ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

export const getRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;
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

  await restaurant.save();

  res.status(201).json({ status: "success", data: restaurant });
});

export const updateRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const restaurant = await Restaurant.findByIdAndUpdate(
    id,
    { $set: req.body },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!restaurant) {
    return next(new AppError("No restaurant found with this ID", 404));
  }

  res.status(201).json({ status: "success", data: restaurant });
});

export const addRestaurantToFavorites = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.id);
  user.favourites.push(req.params.id);
  await user.save();
  res
    .status(200)
    .json({ status: "success", message: "Successfully added to favorites" });
});

export const getRestaurantsWithin = catchAsync(async (req, res, next) => {
  const { distance, unit } = req.query;
  const radius = unit === "mi" ? distance / 3963.2 : distance / 6378.1;
  const { coordinates } = req.user.location;

  const [lat, lng] = coordinates;
  if (isNaN(lat) || isNaN(lng)) {
    return next(
      new AppError(
        `Invalid latlng: ${latlng}. Please provide latitude and longitude in the format lat, lng.`,
        400
      )
    );
  }
  const restaurants = await Restaurant.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    status: "success",
    results: restaurants.length,
    data: restaurants,
  });
});

export const addFoodToRestaurant = catchAsync(async (req, res, next) => {
  const { restaurantId, foodId } = req.params;
  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    return next(new AppError("No restaurant found with this ID", 404));
  }
  // const food = await Food;
  restaurant.foods.push(foodId);
  await restaurant.save();
  res.status(200).json({
    status: "success",
    message: "Food added to restaurant successfully",
  });
});
