const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth'); // Middleware to protect routes

// Middleware to protect routes
router.use(auth);

router.post('/add', taskController.addTask);
router.delete('/delete/:id', taskController.deleteTask);
router.patch('/done/:id', taskController.markTaskAsDone);
router.get('/all', taskController.retrieveAllTasks);
router.get('/missed', taskController.retrieveMissedTasks);
router.get('/completed', taskController.retrieveCompletedTasks);
router.get('/uncompleted', taskController.retrieveUncompletedTasks);

module.exports = router;
