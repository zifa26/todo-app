const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  userId: String,
  title: String,
  priority: { type: String, enum: ["low", "medium", "high"] },
  deadline: Date,
  sharedWith: [String],
});

module.exports = mongoose.model("Task", TaskSchema);
