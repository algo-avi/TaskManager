const express = require("express")
const mongoose = require("mongoose")
const auth = require("../middleware/auth")
const Project = require("../models/Project")
const Task = require("../models/Task")
const router = express.Router()

// Get all projects for the authenticated user
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id })

    // Get task counts for each project
    const projectsWithCounts = await Promise.all(
      projects.map(async (project) => {
        const taskCount = await Task.countDocuments({ project: project._id })
        const completedTaskCount = await Task.countDocuments({
          project: project._id,
          status: "completed",
        })

        return {
          ...project.toObject(),
          taskCount,
          completedTaskCount,
        }
      }),
    )

    res.json(projectsWithCounts)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Get a specific project with its tasks
router.get("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user._id,
    })

    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

    const tasks = await Task.find({ project: project._id }).sort({ createdAt: -1 })

    res.json({
      project,
      tasks,
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Create a new project
router.post("/", auth, async (req, res) => {
  try {
    const { name, description } = req.body

    // Check if user already has 4 projects
    const projectCount = await Project.countDocuments({ user: req.user._id })
    if (projectCount >= 4) {
      return res.status(400).json({ message: "Maximum limit of 4 projects reached" })
    }

    const project = new Project({
      name,
      description,
      user: req.user._id,
    })

    await project.save()
    res.status(201).json(project)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Update a project
router.put("/:id", auth, async (req, res) => {
  try {
    const { name, description } = req.body

    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { name, description },
      { new: true },
    )

    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

    res.json(project)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Delete a project
router.delete("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user._id,
    })

    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

    // Delete all tasks associated with the project
    await Task.deleteMany({ project: project._id })

    // Delete the project
    await project.remove()

    res.json({ message: "Project deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Create a new task for a project
router.post("/:id/tasks", auth, async (req, res) => {
  try {
    const { title, description, status } = req.body

    // Check if project exists and belongs to user
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user._id,
    })

    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

    const task = new Task({
      title,
      description,
      status,
      project: project._id,
    })

    await task.save()
    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

module.exports = router
