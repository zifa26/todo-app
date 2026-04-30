require("dotenv").config();
const mongoose = require("mongoose");

console.log("Testing DB connection...");
console.log("MONGO_URI:", process.env.MONGO_URI ? "Loaded" : "Not loaded");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connected successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.log("DB Connection failed:", err.message);
    console.log("Full error:", err);
    process.exit(1);
  });