import React from "react"
import { useLocation, useOutletContext } from "react-router-dom"
import { BookOpenIcon, UserGroupIcon, PresentationChartLineIcon, CheckCircleIcon } from "@heroicons/react/24/solid"
import { encryptCourseId } from "../../lib/utils/courseEncryptor"
import { createProject } from "../../services"
import temp_image from "../../assets/team-members/porter.png"
import Modal from "../../components/Modal"
import { useAuth } from "../../middleware/AuthProvider"
import TeacherProjectTab from "../../components/Teacher/TeacherProjectTab"

export default function TeacherCourseView() {
  const { cookies, reloadUser } = useAuth()
  const { userDetails } = useOutletContext()

  const location = useLocation()
  const { courseId } = location.state || {}
  const [courseDetails, setCourseDetails] = React.useState(null)
  const [activeStudents, setActiveStudents] = React.useState([])
  const [pendingStudents, setPendingStudents] = React.useState([])

  React.useEffect(() => {
    if (courseId && userDetails && userDetails.courses) {
      const foundCourse = userDetails.courses.find((course) => course.course.courseId === courseId)

      if (foundCourse) {
        setCourseDetails(foundCourse)
        setActiveStudents(foundCourse.course.enrolledStudents.filter((student) => student.isVerified))
        setPendingStudents(foundCourse.course.enrolledStudents.filter((student) => !student.isVerified))
      }
    }
  }, [courseId, userDetails])

  // Modal
  const [modalProps, setModalProps] = React.useState()
  const [showCreateProjectModal, setShowCreateProjectModal] = React.useState(false)

  // Project
  const [projectTitle, setProjectTitle] = React.useState("")
  const [projectDescription, setProjectDescription] = React.useState("")
  const [submissionDeadline, setSubmissionDeadline] = React.useState("")
  const [totalPoints, setTotalPoints] = React.useState(100)
  const [isGroupProject, setGroupProject] = React.useState(false)

  const resetCreateProject = () => {
    setProjectTitle("")
    setProjectDescription("")
    setSubmissionDeadline("")
    setTotalPoints(100)
    setGroupProject(false)
    setShowCreateProjectModal(false)
    setModalProps(null)
  }

  const handleProjectCreation = () => {
    if (projectTitle && projectDescription && submissionDeadline && totalPoints) {
      let formData = {
        title: projectTitle,
        description: projectDescription,
        createdAt: new Date(),
        submissionDeadline: new Date(submissionDeadline),
        totalPoints: totalPoints,
        groupProject: isGroupProject,
        active: true,
        course: {
          courseId: courseDetails.course.courseId,
        },
      }

      createProject(formData, cookies.token)
        .then(() => {
          setModalProps({
            title: "Success",
            message: "Project created successfully!",
            type: "success",
          })

          setTimeout(async () => {
            reloadUser()
            resetCreateProject()
          }, 2000)
        })
        .catch((error) => {
          console.error("Error creating a project:", error)
          setModalProps({
            title: "Error",
            message: "Failed to create a project. Please try again.",
            type: "error",
            onCancel: () => resetCreateProject(),
          })
        })
    } else {
      setModalProps({
        title: "Invalid Input",
        message: "Invalid fields.",
        type: "error",
        onCancel: () => resetCreateProject(),
      })
    }
  }
  return (
    <>
      {courseDetails && (
        <>
          {showCreateProjectModal && (
            <Modal
              ModalProps={{
                title: "Creating a Project",
                type: "OK",
                children: (
                  <form className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="project-title" className="text-sm font-semibold text-neutral-500">
                          Title
                        </label>
                        <input
                          type="text"
                          id="project-title"
                          name="project-title"
                          className="rounded border-2 p-2 text-neutral-600 focus:outline-blue-400"
                          value={projectTitle}
                          onChange={(e) => setProjectTitle(e.target.value)}
                        ></input>
                      </div>
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
                          type="datetime-local"
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
                onCancel: () => resetCreateProject(),
                onConfirm: () => handleProjectCreation(),
              }}
            />
          )}
          {modalProps && <Modal ModalProps={modalProps} />}
          <section className="flex w-full flex-col gap-2 bg-blue-400 p-4">
            <div className="flex place-items-center justify-between border-b-2 py-1">
              <div className="flex place-items-center gap-2">
                <BookOpenIcon className="h-auto w-12 text-white" />
                <div className="flex flex-col">
                  <small className="text-xs text-neutral-100">Course Title</small>
                  <h1 className="text-xl font-bold text-white">{courseDetails.course.title}</h1>
                </div>
                <div className="mx-20 flex flex-col border-l-2 px-4">
                  <small className="text-xs text-neutral-100">Project Description</small>
                  <p className="text-sm font-semibold text-white">{courseDetails.course.description}</p>
                </div>
              </div>

              <div className="flex flex-col">
                <small className="text-xs text-neutral-100">Invite students using this code</small>
                <h2 className="text-xl font-bold text-white">Code: {encryptCourseId(courseDetails.course.courseId)}</h2>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-8">
                <span className="flex gap-1 text-xs text-white">
                  <UserGroupIcon className="h-4 w-auto" />
                  {courseDetails.course.enrolledStudents.length}{" "}
                  {courseDetails.course.enrolledStudents.length === 1 ? "student" : "students"}
                </span>
                <span className="flex gap-1 text-xs text-white">
                  <PresentationChartLineIcon className="h-4 w-auto" />
                  {courseDetails.course.projects.length}{" "}
                  {courseDetails.course.projects.length === 1 ? "project" : "projects"}
                </span>
              </div>
            </div>
          </section>

          <section className="flex">
            <aside className="h-screen w-60 overflow-hidden border-r-2 border-blue-200 p-4 shadow-md">
              <div className="flex h-full w-full flex-col gap-4 overflow-y-scroll">
                <h3 className="text-base font-bold text-blue-400">Students</h3>
                <div className="flex min-h-36 flex-col gap-2 border-b-2 py-2">
                  <h4 className="text-xs font-semibold text-neutral-400">Verified</h4>
                  <ul>
                    {activeStudents.map((data, index) => (
                      <li key={index} className="flex place-items-center gap-1">
                        <img
                          src={temp_image}
                          className="h-auto w-6 rounded-full"
                          alt={data.student.fname + "Profile"}
                        />
                        <p className="text-sm font-semibold text-blue-400">
                          {data.student.fname} {""} {data.student.lname}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex min-h-36 flex-col gap-2 border-b-2 py-2">
                  <h4 className="text-xs font-semibold text-neutral-400">Pending</h4>
                  {pendingStudents.length > 0 ? (
                    <ul>
                      {pendingStudents.map((data, index) => (
                        <li key={index} className="flex place-items-center gap-1">
                          <img
                            src={temp_image}
                            className="h-auto w-6 rounded-full opacity-40"
                            alt={data.student.fname + "Profile"}
                          />
                          <p className="text-sm font-semibold text-neutral-400">
                            {data.student.fname} {""} {data.student.lname}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="flex gap-1 py-2 text-xs font-semibold text-neutral-400">
                      <CheckCircleIcon className="h-auto w-4" />
                      All students are verified!
                    </span>
                  )}
                </div>
              </div>
            </aside>

            <div className="w-full p-8">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold text-neutral-600">Projects</h2>
                <aside className="flex justify-between gap-2">
                  <input
                    className="flex-1 rounded-md border-2 py-1 indent-2 text-sm text-neutral-600 focus:outline-blue-400"
                    type="text"
                    placeholder="Find a project.."
                  />
                  <button
                    type="button"
                    className="flex place-items-center gap-2 rounded-lg bg-blue-400 px-6 py-2 text-sm font-bold text-white hover:bg-blue-300"
                    onClick={() => setShowCreateProjectModal(true)}
                  >
                    <PresentationChartLineIcon className="h-auto w-4" /> Create
                  </button>
                </aside>
                <div className="flex flex-col gap-4">
                  {courseDetails.course.projects.map((project, index) => (
                    <TeacherProjectTab key={index} project={project} courseId={courseDetails.course.courseId} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  )
}
