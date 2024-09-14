const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Add a new task
router.post('/', async (req, res) => {
    try {
        const newTask = new Task({
            title: req.body.title,
        });
        const task = await newTask.save();
        res.json(task);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Update a task
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Task not found' });

        task.completed = req.body.completed;
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Task not found' });

        await task.remove();
        res.json({ msg: 'Task removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
