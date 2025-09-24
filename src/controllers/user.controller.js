import User from "../models/User.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const getUser = catchAsync(async (req, res, next) => {
  const id = req.id;
  const user = await User.findById(id);
  if (!user) {
    return next(new AppError("No user found with this ID", 404));
  }
  res.status(200).json({ status: "success", data: user });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const id = req.id;
  const updatedUser = await User.findOneAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  json.status(200).json({ status: "success", data: updateUser });
});
