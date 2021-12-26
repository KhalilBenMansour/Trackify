const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    cardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "card",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);
const Comment = mongoose.model("comment", commentSchema);
module.exports = Comment;
