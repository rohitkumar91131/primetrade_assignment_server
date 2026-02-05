const express = require('express');
const { getTasks, createTask, deleteTask } = require('../controllers/taskController');
const { protect, checkRole } = require('../middleware/auth');

const router = express.Router();

// Run 'protect' first (get ID), then 'checkRole' (get Role)
router.use(protect, checkRole); 

router.get('/', getTasks);
router.post('/', createTask);
router.delete('/:id', deleteTask);

module.exports = router;