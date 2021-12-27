require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
const app = express();
const users = require("./routes/user");
const boards = require("./routes/board");
const lists = require("./routes/list");
const notifications = require("./routes/notification");
const passport = require("passport");
const cors = require("cors");

const aws = require("aws-sdk");

let s3 = new aws.S3({
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET,
});

app.use(passport.initialize());
app.use(express.json());
app.use(cors());
connectDB();

app.use("/api/users", users);
app.use("/api/boards", boards);
app.use("/api/lists", lists);
app.use("/api/notifications", notifications);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "false",
    message: "page not found",
  });
  next();
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, (err) => {
  err
    ? console.log(err)
    : console.log(`the server is running on port http://localhost:${PORT}`);
});
