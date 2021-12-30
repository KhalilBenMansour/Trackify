const mongoose = require("mongoose");
const cardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    order: { type: Number, required: true },
    completed: { type: Boolean, required: true, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
    ],
  },
  { timestamps: true }
);
module.exports = cardSchema;
