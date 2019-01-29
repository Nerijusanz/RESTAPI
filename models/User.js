import mongoose from "mongoose";

const schema = new mongoose.Schema({
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
  }
});

export default mongoose.model("User", schema);
