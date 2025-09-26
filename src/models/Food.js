import mongoose, { mongo } from "mongoose";
const { Schema } = mongoose;
const foodSchema = new Schema({
  name: {
    type: String,
    required: [true, "Food must have a name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Food must have a description"],
  },
  image: {
    type: String,
    validate: {
      validator: function (v) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/.test(v);
      },
      message: (props) => `${props.value} is not a valid image URL!`,
    },
    required: [true, "Food must have an image URL"],
  },
  price: {
    type: Number,
    required: [true, "Food must have a price"],
  },
  restaurant: {
    type: mongoose.Schema.ObjectId,
    ref: "Restaurant",
    required: [true, "Food must belong to a restaurant"],
  },
});

foodSchema.pre(/^find/, function (next) {
  this.populate({
    path: "restaurant",
    select: "-__v -foods",
  });
  next();
});
export default mongoose.model("Food", foodSchema);
