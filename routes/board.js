const express = require("express");
const {
  createBoard,
  getBoards,
  getBoard,
  getlistsOfBoard,
  updateBoard,
  getNotifications,
  deleteBoard,
} = require("../controllers/board");
const { isAuth } = require("../middelwares/passoport-setup");
const router = express.Router();

router.post("/", createBoard);
router.get("/", isAuth(), getBoards);
router.get("/:id", isAuth(), getBoard);
router.put("/:id", isAuth(), updateBoard);
router.delete("/:id", isAuth(), deleteBoard);
router.get("/:id/lists", isAuth(), getlistsOfBoard);
router.get("/:id/notifications", isAuth(), getNotifications);

module.exports = router;
