const express = require("express");
const router = express.Router();
const { registerUser, userLogin } = require("../controllers/user");
const { userValidate } = require("../middelwares/userValidator");
const { isAuth } = require("../middelwares/passoport-setup");

router.post("/register", userValidate, registerUser);
router.post("/login", userLogin);
router.get("/currentUser", isAuth(), function (req, res) {
  res.send(req.user);
});
module.exports = router;
