const Notification = require("../models/notification");
const Board = require("../models/board");

// create notification by boardId for a user
const createNotification = async (req, res) => {
  const boardId = req.body.boardId;

  try {
    const board = await Board.findOne({ _id: boardId, userId: req.user });

    if (!board) {
      return res.status(404).json({
        success: false,
        msg: "there is no board with this boardId for this user",
      });
    }
    const newNotification = new Notification(req.body);
    const notificationRes = await newNotification.save();
    res
      .status(201)
      .json({ msg: "notificaton added successfully", notificationRes });
  } catch (error) {
    res.status(400).json({ msg: "notification add failed", error });
  }
};

// delete notification by id
const deleteNotificaiton = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await Notification.findByIdAndDelete(id);
    if (!notification)
      return res
        .status(404)
        .json({ success: false, msg: "notification Not Found" });
    res.status(200).json({
      success: true,
      msg: " notification has been deleted",
      notification,
    });
  } catch (error) {
    res.status(400).json({ msg: "failed to delete notification", error });
  }
};

module.exports = { createNotification, deleteNotificaiton };
