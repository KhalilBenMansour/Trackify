const express = require("express");
const {
  createList,
  getListById,
  getCardsOfList,
  updateList,
  deleteList,
} = require("../controllers/list");
const { isAuth } = require("../middelwares/passoport-setup");
const router = express.Router();

router.post("/", isAuth(), createList);
router.get("/:id", getListById);
router.get("/:id/cards", getCardsOfList);
router.put("/:id", updateList);
router.delete("/:id", deleteList);

module.exports = router;
