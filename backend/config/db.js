const mongoose = require("mongoose");

const db = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
    });
};

module.exports = db;
