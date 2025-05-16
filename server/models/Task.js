const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["todo", "in progress", "completed"],
      default: "todo",
    },
    completedAt: {
      type: Date,
      default: null,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

// Update completedAt when status changes to completed
taskSchema.pre("save", function (next) {
  if (this.isModified("status") && this.status === "completed" && !this.completedAt) {
    this.completedAt = new Date()
  } else if (this.isModified("status") && this.status !== "completed") {
    this.completedAt = null
  }
  next()
})

const Task = mongoose.model("Task", taskSchema)

module.exports = Task
