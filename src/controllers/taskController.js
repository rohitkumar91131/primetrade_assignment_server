const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    if (req.user.role === 'ADMIN') {
      const tasks = await Task.find({}).populate('user', 'name email');
      return res.json(tasks);
    }

    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
    
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      user: req.user.id
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (req.user.role === 'ADMIN' || task.user.toString() === req.user.id) {
      await task.deleteOne();
      return res.json({ message: 'Task removed' });
    }

    return res.status(401).json({ message: 'Not authorized' });

  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};