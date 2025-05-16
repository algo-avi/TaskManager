"use client"

import { useState } from "react"
import { formatDate } from "../utils/helpers"
import EditTaskModal from "./EditTask"
import DeleteTaskModal from "./DeleteTask"

const TaskList = ({ tasks, onTaskUpdated, onTaskDeleted }) => {
  const [selectedTask, setSelectedTask] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "todo":
        return "bg-gray-100 text-gray-800"
      case "in progress":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleEditClick = (task) => {
    setSelectedTask(task)
    setShowEditModal(true)
  }

  const handleDeleteClick = (task) => {
    setSelectedTask(task)
    setShowDeleteModal(true)
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <li key={task._id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <p className="text-sm font-medium text-blue-600 truncate">{task.title}</p>
                  <div
                    className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(task.status)}`}
                  >
                    {task.status}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => handleEditClick(task)} className="text-blue-600 hover:text-blue-900">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteClick(task)} className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">{task.description || "No description"}</p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <p>
                    Created: {formatDate(task.createdAt)}
                    {task.completedAt && ` • Completed: ${formatDate(task.completedAt)}`}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {showEditModal && selectedTask && (
        <EditTaskModal
          task={selectedTask}
          onClose={() => setShowEditModal(false)}
          onTaskUpdated={(updatedTask) => {
            onTaskUpdated(updatedTask)
            setShowEditModal(false)
          }}
        />
      )}

      {showDeleteModal && selectedTask && (
        <DeleteTaskModal
          task={selectedTask}
          onClose={() => setShowDeleteModal(false)}
          onTaskDeleted={() => {
            onTaskDeleted(selectedTask._id)
            setShowDeleteModal(false)
          }}
        />
      )}
    </div>
  )
}

export default TaskList
