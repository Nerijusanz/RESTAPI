import mongoose from "mongoose";

const schema = new mongoose.Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: {
    type: [Number],
    index: "2dsphere"
  }
});

const Geo = mongoose.model("Geo", schema);

module.exports = Geo;
