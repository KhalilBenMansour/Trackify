const mongoose = require("mongoose");
const boardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);
const Board = mongoose.model("board", boardSchema);
module.exports = Board;
