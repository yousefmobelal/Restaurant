import mongoose, { mongo } from "mongoose";
const { Schema } = mongoose;
const foodSchema = new Schema({
  name: {
    type: String,
    required: [true, "Food must have a name"],
    trim: true,
  },
  image: {
    type: String,
    required: [true, "Food must have an image"],
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
export default mongoose.model("Food", foodSchema);
