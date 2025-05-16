"use client"

import { useState } from "react"
import api from "../utils/api"
import { toast } from "react-toastify"

const DeleteTaskModal = ({ task, onClose, onTaskDeleted }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await api.delete(`/tasks/${task._id}`)
      onTaskDeleted()
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete task")
      onClose()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-5">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Task</h3>
          <p className="text-sm text-gray-500">
            Are you sure you want to delete the task "{task.title}"? This action cannot be undone.
          </p>
        </div>
        <div className="px-5 py-3 bg-gray-50 sm:px-6 rounded-b-lg flex justify-end">
          <button
            type="button"
            className="mr-2 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isLoading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            onClick={handleDelete}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteTaskModal
