import React from "react"
import {
  UserGroupIcon,
  PresentationChartLineIcon,
  CalendarDaysIcon,
  ClockIcon,
  UserIcon,
  TrophyIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/solid"
import { useAuth } from "../../middleware/AuthProvider"
import { updateProject, deleteProject } from "../../services/index"
import Modal from "../../components/Modal"

export default function TeacherProjectTab({ project }) {
  const { cookies, reloadUser } = useAuth()
  const [showOptions, setShowOptions] = React.useState(false)

  // Modal
  const [modalProps, setModalProps] = React.useState(null)
  const [editProjectModal, setEditProjectModal] = React.useState(false)

  // Edit
  const [projectDescription, setProjectDescription] = React.useState("")
  const [submissionDeadline, setSubmissionDeadline] = React.useState("")
  const [totalPoints, setTotalPoints] = React.useState(100)
  const [isGroupProject, setGroupProject] = React.useState(false)

  const handleEditProject = () => {
    let formData = {
      projectId: project.projectId,
      description: projectDescription,
      submissionDeadline: submissionDeadline,
      totalPoints: totalPoints,
      isGroupProject: isGroupProject,
    }

    updateProject(formData, cookies.token)
      .then(() => {
        setModalProps({
          title: "Success",
          message: "Project has been sucessfully edited!",
          type: "success",
          onCancel: () => resetEditProject(),
        })
        setTimeout(() => {
          resetEditProject()
          reloadUser()
        }, 2000)
      })
      .catch(() => {
        setModalProps({
          title: "Error",
          message: "Failed to edit project. Please try again.",
          type: "error",
          onCancel: () => resetEditProject(),
        })
      })
  }

  const resetEditProject = () => {
    setEditProjectModal(false)
    setProjectDescription("")
    setSubmissionDeadline("")
    setTotalPoints(100)
    setGroupProject(false)
    setShowOptions(false)
    setModalProps(null)
  }

  // Delete
  const handleDeleteProject = () => {
    setModalProps({
      title: `Deleting Project: ${project.title}`,
      message: "Are you sure you want to delete this project? This action is irreversible.",
      type: "warning",
      onCancel: () => setModalProps(null),
      onConfirm: () => {
        deleteProjectFunction()
        setShowOptions(false)
        setModalProps(null)
      },
    })
  }

  const deleteProjectFunction = () => {
    deleteProject(project.projectId, cookies.token)
      .then(() => {
        setModalProps({
          title: "Success",
          message: "Project has been sucessfully deleted!",
          type: "success",
          onCancel: () => setModalProps(null),
        })

        setTimeout(() => {
          setModalProps(null)
          reloadUser()
        }, 2000)
      })
      .catch(() => {
        setModalProps({
          title: "Error",
          message: "Failed to delete project. Please try again.",
          type: "error",
          onCancel: () => setModalProps(null),
        })
      })
  }

  return (
    <div className="flex justify-between rounded-lg border-2 border-blue-300 px-8 shadow-md">
      {editProjectModal && (
        <Modal
          ModalProps={{
            title: `Editing Project: ${project.title}`,
            type: "OK",
            children: (
              <form className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="project-description" className="text-sm font-semibold text-neutral-500">
                      Description
                    </label>
                    <textarea
                      id="project-description"
                      name="project-description"
                      rows="3"
                      className="resize-none rounded border-2 p-2 text-neutral-600 focus:outline-blue-400"
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="submission-deadline" className="text-sm font-semibold text-neutral-500">
                      Submission Deadline
                    </label>
                    <input
                      type="date"
                      id="submission-deadline"
                      name="submission-deadline"
                      className="rounded border-2 p-2 text-neutral-600 focus:outline-blue-400"
                      value={submissionDeadline}
                      onChange={(e) => setSubmissionDeadline(e.target.value)}
                    ></input>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="total-points" className="text-sm font-semibold text-neutral-500">
                      Total Points
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      pattern="\d+"
                      id="total-points"
                      name="total-points"
                      className="rounded border-2 p-2 text-neutral-600 focus:outline-blue-400"
                      value={totalPoints}
                      onChange={(e) => setTotalPoints(e.target.value)}
                    ></input>
                  </div>
                  <div className="flex place-items-center gap-4">
                    <label htmlFor="is-group-project" className="text-sm font-semibold text-neutral-500">
                      Is Group Project?
                    </label>
                    <input
                      type="checkbox"
                      id="is-group-project"
                      name="is-group-project"
                      className="rounded border-2 p-2 text-neutral-600 focus:outline-blue-400"
                      value={isGroupProject}
                      onChange={(e) => setGroupProject(e.target.checked)}
                    ></input>
                  </div>
                </div>
              </form>
            ),
            onCancel: () => resetEditProject(),
            onConfirm: () => handleEditProject(),
          }}
        />
      )}
      {modalProps && <Modal ModalProps={modalProps} />}
      <div className="flex flex-col gap-8 pb-4 pt-8">
        <div className="flex gap-8">
          <div className="flex gap-2">
            <PresentationChartLineIcon className="h-auto w-12 text-blue-400" />
            <div className="flex flex-col">
              <small className="text-xs text-neutral-400">Project Title</small>
              <h1 className="text-xl font-bold text-blue-400">{project.title}</h1>
            </div>
          </div>
          <div className="flex flex-col border-l-2 px-4">
            <small className="text-xs text-neutral-400">Project Description</small>
            <p className="text-sm font-semibold text-neutral-400">{project.description}</p>
          </div>
        </div>
        <div className="flex gap-8">
          <span className="flex gap-1 text-xs text-neutral-400">
            <CalendarDaysIcon className="h-4 w-auto" /> Created at{" "}
            {new Date(project.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </span>
          <span className="flex gap-1 text-xs text-neutral-400">
            <ClockIcon className="h-4 w-auto" /> Deadline on{" "}
            {new Date(project.submissionDeadline).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </span>
          <span className="flex gap-1 text-xs text-neutral-400">
            <TrophyIcon className="h-4 w-auto" />
            {project.totalPoints} Total Points
          </span>
          <span className="flex gap-1 text-xs text-neutral-400">
            {project.isGroupProject ? (
              <>
                <UserGroupIcon className="h-4 w-auto" />
                Group Submission
              </>
            ) : (
              <>
                <UserIcon className="h-4 w-auto" />
                Individual Submission
              </>
            )}
          </span>
        </div>
      </div>
      <div className="flex place-items-center pb-6">
        <button
          type="button"
          className="text-neutral-400 hover:text-blue-400"
          onClick={() => setShowOptions(!showOptions)}
        >
          <EllipsisVerticalIcon className="h-auto w-8" />
        </button>
        {showOptions && (
          <div className="relative">
            <div className="absolute right-4 top-4 flex w-36 flex-col gap-2 rounded-l-2xl rounded-br-2xl border-2 border-neutral-400 p-2 shadow-md">
              <button
                type="button"
                className="text-xs font-semibold text-neutral-400 hover:text-blue-400"
                onClick={() => setEditProjectModal(!editProjectModal)}
              >
                Edit Project
              </button>
              <button
                type="button"
                className="text-xs font-semibold text-neutral-400 hover:text-red-400"
                onClick={handleDeleteProject}
              >
                Delete Project
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
