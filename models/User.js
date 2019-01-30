import mongoose from "mongoose";

const Schema = mongoose.Schema;

const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: {
    type: [Number], // array of numbers [125.6,10.1]
    index: "2d"
  }
});

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "name field is required"]
  },
  rank: {
    type: String
  },
  available: {
    type: Boolean,
    default: false
  },
  geometry: GeoSchema
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
