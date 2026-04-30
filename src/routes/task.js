const router = require("express").Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

// CREATE
router.post("/", auth, async (req, res) => {
  const task = new Task({
    userId: req.user.id,
    title: req.body.title,
    priority: req.body.priority,
    deadline: req.body.deadline,
    sharedWith: req.body.sharedWith || [],
  });

  await task.save();
  res.json(task);
});

// GET
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({
    $or: [{ userId: req.user.id }, { sharedWith: req.user.id }],
  });

  res.json(tasks);
});

// UPDATE
router.put("/:id", auth, async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(task);
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

module.exports = router;
