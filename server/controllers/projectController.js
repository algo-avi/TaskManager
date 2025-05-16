const Project = require('../models/Project');

exports.createProject = async (req, res) => {
    const { title } = req.body;
    const newProject = new Project({ userId: req.user.id, title });
    try {
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ message: 'Error creating project', error: error.message });
    }
};

// Additional CRUD operations for projects can be added here
