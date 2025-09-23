import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { checkEmail, checkPhoneNumber } from "../utils/regexExpressions.js";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "User must have a name"],
  },
  location: {
    type: {
      type: String,
      default: "Point",
      enum: ["Point"],
    },
    coordinates: [Number],
    address: String,
  },

  phone: {
    type: String,
    validate: [checkPhoneNumber, "Please provide a valid phone number"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "User must have an email"],
    unique: true,
    lowercase: true,
    validate: [checkEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
    minLength: 8,
    select: false,
  },
  cart: [{ type: mongoose.Schema.ObjectId, ref: "Food" }],
  favourites: [{ type: mongoose.Schema.ObjectId, ref: "Restaurant" }],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);
