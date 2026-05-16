import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
  restaurantName: String,
  name: String,
  description: String,
  quantity: String,
  imagePath: String,
  location: {
    lat: Number,
    lng: Number,
    address: String
  },
  status: {
  type: String,
  enum: ["Pending", "Accepted", "Distributed"],
  default: "Pending"
},

acceptedBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Volunteer",
  default: null
},

acceptedByName: String,

proofImage: String,
distributionMessage: String,
distributedAt: Date,

createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Food", FoodSchema);
