const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "card",
      required: true,
    },
  ],
});
const User = mongoose.model("user", userSchema);

module.exports = User;
