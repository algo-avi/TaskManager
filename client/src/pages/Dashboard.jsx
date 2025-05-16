"use client"

import { useState, useEffect, useContext } from "react"
import { toast } from "react-toastify"
import api from "../utils/api"
import { AuthContext } from "../context/AuthContext"
import Navbar from "../components/Navbar"
import ProjectCard from "../components/ProjectCard"
import CreateProjectModal from "../components/CreateProject"

const Dashboard = () => {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setIsLoading(true)
      const response = await api.get("/projects")
      setProjects(response.data)
    } catch (error) {
      toast.error("Failed to fetch projects")
    } finally {
      setIsLoading(false)
    }
  }

  const handleProjectCreated = (newProject) => {
    setProjects([...projects, newProject])
    setShowModal(false)
    toast.success("Project created successfully!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">My Projects</h1>
            <button
              onClick={() => setShowModal(true)}
              disabled={projects.length >= 4}
              className={`px-4 py-2 rounded-md text-white font-medium ${
                projects.length >= 4 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {projects.length >= 4 ? "Max Projects Reached" : "Create Project"}
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <p>Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
              <p className="text-gray-500 mb-4">You don't have any projects yet.</p>
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create your first project
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} onProjectUpdated={fetchProjects} />
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && <CreateProjectModal onClose={() => setShowModal(false)} onProjectCreated={handleProjectCreated} />}
    </div>
  )
}

export default Dashboard
