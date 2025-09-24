import mongoose, { mongo } from "mongoose";

const { Schema } = mongoose;

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: [true, "Restaurant must have a name"],
    unique: true,
    trim: true,
    maxlength: [40, "name must be less than or equal to 40 characters"],
    minlength: [5, "name must be more than or equal to 5 characters"],
  },
  rating: {
    type: Number,
    default: 4.5,
    max: [5.0, "Rating must be less than or equal 5.0"],
    min: [1.0, "Rating must be greater than or equal 1.0"],
    set: (val) => Math.round(val * 10) / 10,
  },
  ratingsQuantity: { type: Number, default: 0 },
  description: {
    type: String,
    trim: true,
    required: [true, "A restaurant must have a description"],
  },
  categories: {
    type: [String],
    required: [true, "Restaurant must have categories."],
  },
  location: {
    type: {
      type: String,
      default: "Point",
      enum: ["Point"],
    },
    coordinates: [Number],
    address: String,
    description: String,
  },

  foods: [{ type: mongoose.Schema.ObjectId, ref: "Food" }],
});

restaurantSchema.pre(/^find/, function (next) {
  this.populate({
    path: "foods",
    select: "-__v -restaurant",
  });
  next();
});

//The location field stores [longitude, latitude] points and queries should use spherical geometry.
restaurantSchema.index({ location: "2dsphere" });

export default mongoose.model("Restaurant", restaurantSchema);
