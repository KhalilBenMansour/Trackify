const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "board",
      required: true,
    },
  },
  { timestamps: true }
);
const Notification = mongoose.model("notification", notificationSchema);
module.exports = Notification;
