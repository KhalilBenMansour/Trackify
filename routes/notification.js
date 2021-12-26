const express = require("express");
const {
  createNotification,
  deleteNotificaiton,
} = require("../controllers/notification");
const { isAuth } = require("../middelwares/passoport-setup");
const router = express.Router();

router.post("/", isAuth(), createNotification);
router.delete("/:id", deleteNotificaiton);

module.exports = router;
