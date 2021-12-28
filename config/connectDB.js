const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI || "mongodb://localhost:27017/trackifydb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`connected to mongodb`);
    })
    .catch((e) => {
      console.log("Something went wrong", e);
    });
};
module.exports = connectDB;
