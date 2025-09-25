import AppError from "../utils/appError.js";

export const restrictToAdmin = (req, res, next) => {
  console.log(req.user.isAdmin);
  if (!req.user.isAdmin) {
    return next(
      new AppError("You do not have permission to perform this action", 403)
    );
  }
  next();
};

export const restrictToUser = (req, res, next) => {
  if (req.user.isAdmin) {
    return next(
      new AppError("You do not have permission to perform this action", 403)
    );
  }
  next();
};
