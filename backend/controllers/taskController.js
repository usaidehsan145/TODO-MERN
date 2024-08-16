const Task = require('../models/Task');

// Add Task
exports.addTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const task = new Task({
      title,
      description,
      dueDate,
      userId: req.user._id // Use authenticated user's ID
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mark Task as Done
exports.markTaskAsDone = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, { completed: true }, { new: true });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Retrieve All Tasks
exports.retrieveAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Retrieve Missed Tasks
exports.retrieveMissedTasks = async (req, res) => {
  try {
    const now = new Date();
    const tasks = await Task.find({
      userId: req.user._id,
      dueDate: { $lt: now },
      completed: false
    });
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Retrieve Completed Tasks
exports.retrieveCompletedTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.user._id,
      completed: true
    });
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Retrieve Uncompleted Tasks
exports.retrieveUncompletedTasks = async (req, res) => {
    try {
      const tasks = await Task.find({
        userId: req.user._id,
        completed: false
      });
      res.json(tasks);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};
