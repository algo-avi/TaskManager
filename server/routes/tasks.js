const express = require("express")
const auth = require("../middleware/auth")
const Task = require("../models/Task")
const Project = require("../models/Project")
const router = express.Router()

// Update a task
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, description, status } = req.body

    // Find the task
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    // Check if the task belongs to a project owned by the user
    const project = await Project.findOne({
      _id: task.project,
      user: req.user._id,
    })

    if (!project) {
      return res.status(403).json({ message: "Not authorized to update this task" })
    }

    // Update task
    task.title = title
    task.description = description
    task.status = status

    await task.save()
    res.json(task)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Delete a task
router.delete("/:id", auth, async (req, res) => {
  try {
    // Find the task
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    // Check if the task belongs to a project owned by the user
    const project = await Project.findOne({
      _id: task.project,
      user: req.user._id,
    })

    if (!project) {
      return res.status(403).json({ message: "Not authorized to delete this task" })
    }

    await task.remove()
    res.json({ message: "Task deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

module.exports = router
