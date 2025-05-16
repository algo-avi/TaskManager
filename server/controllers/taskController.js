const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    const { projectId, title, description } = req.body;
    const newTask = new Task({ projectId,