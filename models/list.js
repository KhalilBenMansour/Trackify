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

const listSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    order: { type: Number, required: true },

    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "board",
      required: true,
    },
    cards: [cardSchema],
  },
  { timestamps: true }
);
const List = mongoose.model("list", listSchema);
module.exports = List;
