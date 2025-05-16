"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import api from "../utils/api"
import Navbar from "../components/Navbar"
import TaskList from "../components/TaskList"
import CreateTaskModal from "../components/CreateTask"

const ProjectDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchProjectDetails()
  }, [id])

  const fetchProjectDetails = async () => {
    try {
      setIsLoading(true)
      const response = await api.get(`/projects/${id}`)
      setProject(response.data.project)
      setTasks(response.data.tasks)
    } catch (error) {
      toast.error("Failed to fetch project details")
      navigate("/dashboard")
    } finally {
      setIsLoading(false)
    }
  }

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask])
    setShowModal(false)
    toast.success("Task created successfully!")
  }

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)))
  }

  const handleTaskDeleted = (taskId) => {
    setTasks(tasks.filter((task) => task._id !== taskId))
    toast.success("Task deleted successfully!")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex justify-center items-center h-64">
              <p>Loading project details...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{project.name}</h1>
              <p className="text-gray-500 mt-1">{project.description}</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Task
            </button>
          </div>

          {tasks.length === 0 ? (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
              <p className="text-gray-500 mb-4">This project doesn't have any tasks yet.</p>
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create your first task
              </button>
            </div>
          ) : (
            <TaskList tasks={tasks} onTaskUpdated={handleTaskUpdated} onTaskDeleted={handleTaskDeleted} />
          )}
        </div>
      </div>

      {showModal && (
        <CreateTaskModal projectId={id} onClose={() => setShowModal(false)} onTaskCreated={handleTaskCreated} />
      )}
    </div>
  )
}

export default ProjectDetails
