import User from "../models/User.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const sendUserWithToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  user.password = undefined;
  res
    .status(statusCode)
    .json({ status: "success", data: { ...user._doc, token } });
};
export const signup = async (req, res, next) => {
  try {
    const user = await User.create({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      location: req.body.location,
    });
    sendUserWithToken(user, 201, req, res);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(`These are email and password: ${email}, ${password}`);
  if (!email || !password) {
    return next(
      new AppError("You should provide bothe email and password", 400)
    );
  }
  const user = await User.findOne({ email }).select("+password");
  console.log(`This is user:${user}`);
  if (!user || !(await user.correctPassword(password))) {
    return next(new AppError("Invalid email or password", 401));
  }

  sendUserWithToken(user, 200, req, res);
};
