const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const newUser = new User({ ...req.body });
  const email = newUser.email;
  const searchRes = await User.findOne({ email });

  if (searchRes) return res.status(403).send("Email already exist");
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;
    await newUser.save();
    res.status(201).json({ msg: "user added successfully" });
  } catch (err) {
    res.status(400).json({ msg: "User register failed", err });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "enter all fields value" });
  }
  const user = await User.findOne({ email });
  if (!user) return res.status(403).json({ msg: "email does not exist" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Bad credentiel" });
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
  };
  try {
    const token = await jwt.sign(payload, process.env.secretOrKey);
    res
      .status(200)
      .json({ msg: "user login with success", token: `Bearer ${token}` });
  } catch (error) {
    res.status(400).json({ msg: "User login failed", err });
  }
};

module.exports = { registerUser, userLogin };
