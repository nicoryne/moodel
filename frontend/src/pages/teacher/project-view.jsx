import React from "react"
import { useLocation, useOutletContext, Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../middleware/AuthProvider"
import {
  ArrowLeftCircleIcon,
  PresentationChartLineIcon,
  CalendarDaysIcon,
  ClockIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid"
import Modal from "../../components/Modal"
import {
  getSubmissionsByProjectId,
  retrieveFile,
  deleteSubmission,
  updateSubmission,
  detectAiScore,
} from "../../services"
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer"
import "@cyntler/react-doc-viewer/dist/index.css"

export default function TeacherProjectView() {
  const { cookies, reloadUser } = useAuth()
  const { userDetails } = useOutletContext()

  const location = useLocation()
  const navigate = useNavigate()

  const { projectId, courseId } = location.state || {}
  const [projectDetails, setProjectDetails] = React.useState(null)
  const [courseDetails, setCourseDetails] = React.useState(null)
  const [submissions, setSubmissions] = React.useState([])

  const groupSubmissionsByType = async (isGroupProject) => {
    try {
      const fetchedSubmissions = await getSubmissionsByProjectId(projectId, cookies.token)
      const submissionsArray = Array.isArray(fetchedSubmissions) ? fetchedSubmissions : []

      const groupedSubmissions = submissionsArray.reduce((acc, submission) => {
        if (!isGroupProject) {
          const studentId = submission?.ownedByStudent?.studentId
          if (!studentId) {
            console.warn("Submission missing studentId:", submission)
            return acc
          }

          if (!acc[studentId]) {
            acc[studentId] = []
          }

          acc[studentId].push(submission)
        } else {
          const groupId = submission?.ownedByGroup?.groupId
          if (!groupId) {
            console.warn("Submission missing groupId:", submission)
            return acc
          }

          if (!acc[groupId]) {
            acc[groupId] = []
          }

          acc[groupId].push(submission)
        }
        return acc
      }, {})

      return groupedSubmissions
    } catch (error) {
      console.error("Error grouping submissions:", error)
      return {}
    }
  }

  const fetchFilesForSubmissions = async (submissions) => {
    const updatedSubmissions = {}

    for (const studentId in submissions) {
      if (submissions[studentId]) {
        updatedSubmissions[studentId] = await Promise.all(
          submissions[studentId].map(async (submission) => {
            if (submission.fileURL) {
              try {
                const fileUrl = await retrieveFile(submission.fileURL, cookies.token)
                return { ...submission, fileURL: fileUrl }
              } catch (error) {
                console.error(`Failed to fetch file for submission ${submission.submissionId}:`, error)
                return { ...submission, fileURL: null }
              }
            }
            return submission
          }),
        )
      }
    }

    return updatedSubmissions
  }

  React.useEffect(() => {
    const fetchData = async () => {
      if (projectId && userDetails && courseId) {
        const foundCourse = userDetails.courses.find((course) => course.course.courseId === courseId)

        if (foundCourse) {
          setCourseDetails(foundCourse)
        }

        const foundProject = foundCourse?.course.projects.find((project) => project.projectId === projectId)

        if (foundProject) {
          setProjectDetails(foundProject)

          const groupedSubmissions = await groupSubmissionsByType(foundProject.isGroupProject)
          const submissionsWithFiles = await fetchFilesForSubmissions(groupedSubmissions)

          setSubmissions(submissionsWithFiles)
        }
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, userDetails, courseId, cookies.token])

  // FileViewer
  const [fileToView, setFileToView] = React.useState(null)
  const [AIScore, setAIScore] = React.useState(null)

  const handleFileView = async (blob) => {
    if (blob) {
      setFileToView(blob)
      const score = await detectAiScore(blob)
      setAIScore(score)
    }
  }

  // Modal
  const [modalProps, setModalProps] = React.useState(null)

  // Delete
  const handleDeleteSubmission = (submission) => {
    setModalProps({
      title: `Deleting Submission`,
      message: "Are you sure you want to delete this submission? This action is irreversible.",
      type: "warning",
      onCancel: () => setModalProps(null),
      onConfirm: () => {
        deleteSubmissionFunction(submission.submissionId)
        setModalProps(null)
      },
    })
  }

  const deleteSubmissionFunction = (submissionId) => {
    deleteSubmission(submissionId, cookies.token)
      .then(() => {
        setModalProps({
          title: "Success",
          message: "Submission has been sucessfully deleted!",
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
          message: "Failed to delete submission. Please try again.",
          type: "error",
          onCancel: () => setModalProps(null),
        })
      })
  }

  // Edit
  const [editSubmissionModal, setEditSubmissionModal] = React.useState(null)
  const [submissionToEdit, setSubmissionToEdit] = React.useState(null)
  const [submissionFeedback, setSubmissionFeedback] = React.useState("")
  const [submissionStatus, setSubmissionStatus] = React.useState("")
  const [submissionPoints, setSubmissionPoints] = React.useState(null)

  const showEditSubmissionModal = (submission) => {
    setSubmissionToEdit(submission)
    setEditSubmissionModal(true)
  }

  const handleEditSubmission = () => {
    setEditSubmissionModal(false)
    const submission = submissionToEdit

    if (submissionPoints > submission.assignedToProject.totalPoints) {
      setModalProps({
        title: "Error",
        message: "Accumulated points cannot exceed the total points assigned to the project.",
        type: "error",
        onCancel: () => resetEditSubmission(),
      })
      return
    }

    let formData = {
      submissionId: submission.submissionId,
      feedback: submissionFeedback,
      status: submissionStatus,
      accumulatedPoints: submissionPoints,
    }

    if (
      submissionPoints != null &&
      submissionPoints > 0 &&
      submissionPoints < submission.assignedToProject.totalPoints
    ) {
      formData = {
        ...formData,
        accumulatedPoints: submissionPoints,
      }
    }

    updateSubmission(formData, cookies.token)
      .then(() => {
        setModalProps({
          title: "Success",
          message: "Submission has been sucessfully edited!",
          type: "success",
          onCancel: () => resetEditSubmission(),
        })
        setTimeout(() => {
          resetEditSubmission()
          reloadUser()
        }, 2000)
      })
      .catch(() => {
        setModalProps({
          title: "Error",
          message: "Failed to edit submission. Please try again.",
          type: "error",
          onCancel: () => resetEditSubmission(),
        })
      })
  }

  const resetEditSubmission = () => {
    setEditSubmissionModal(false)
    setSubmissionToEdit(null)
    setSubmissionFeedback("")
    setSubmissionStatus("")
    setSubmissionPoints(null)
    setModalProps(null)
  }

  return (
    <>
      {modalProps && <Modal ModalProps={modalProps} />}
      {editSubmissionModal && (
        <Modal
          ModalProps={{
            title: `Editing Submission`,
            type: "OK",
            children: (
              <form className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="submission-feedback" className="text-sm font-semibold text-neutral-500">
                      Feedback
                    </label>
                    <textarea
                      id="submission-feedback"
                      name="submission-feedback"
                      rows="3"
                      className="resize-none rounded border-2 p-2 text-neutral-600 focus:outline-blue-400"
                      value={submissionFeedback}
                      onChange={(e) => setSubmissionFeedback(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="submission-status" className="mt-3 text-sm font-semibold text-neutral-500">
                      Submission Status
                    </label>
                    <select
                      id="submission-status"
                      name="submission-status"
                      className="rounded border-2 p-2 text-neutral-600 focus:outline-blue-400"
                      onChange={(e) => setSubmissionStatus(e.target.value)}
                    >
                      <option value="Revise">Revise</option>
                      <option value="Accepted">Accepted</option>
                    </select>
                  </div>
                  {submissionStatus === "Accepted" && (
                    <div className="flex flex-col gap-1">
                      <label htmlFor="submission-points" className="text-sm font-semibold text-neutral-500">
                        Total Points
                      </label>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        pattern="\d+"
                        id="submission-points"
                        name="submission-points"
                        className="rounded border-2 p-2 text-neutral-600 focus:outline-blue-400"
                        value={submissionPoints}
                        onChange={(e) => setSubmissionPoints(e.target.value)}
                      ></input>
                    </div>
                  )}
                </div>
              </form>
            ),
            onCancel: () => resetEditSubmission(),
            onConfirm: () => handleEditSubmission(),
          }}
        />
      )}
      {fileToView && (
        <section>
          <aside className="flex w-full">
            <div className="flex w-full justify-between border-b-2 px-4 py-8">
              <button
                type="button"
                onClick={() => setFileToView(null)}
                className="flex cursor-pointer place-items-center gap-2 text-neutral-400 hover:text-blue-400"
              >
                <ArrowLeftCircleIcon className="h-auto w-8" />
                <p>Close file</p>
              </button>
              {AIScore && <span className="font-semibold text-neutral-400">AI-Index: {AIScore}%</span>}
            </div>
          </aside>
          <DocViewer
            id="document-viewer"
            documents={[
              {
                uri: fileToView,
              },
            ]}
            pluginRenderers={DocViewerRenderers}
          />
        </section>
      )}
      {!fileToView && projectDetails && courseDetails && (
        <section className="flex flex-col gap-8 p-16">
          <aside className="flex w-full">
            <div className="w-full border-b-2 py-8">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex cursor-pointer place-items-center gap-2 text-neutral-400 hover:text-blue-400"
              >
                <ArrowLeftCircleIcon className="h-auto w-8" />
                <p>Go back</p>
              </button>
            </div>
          </aside>

          <div className="flex flex-col gap-6">
            <header className="flex place-items-center gap-2">
              <PresentationChartLineIcon className="h-auto w-16 text-blue-400" />
              <div className="flex flex-col">
                <small className="text-xs text-neutral-400">Project Title</small>
                <h1 className="text-4xl font-bold text-blue-400">{projectDetails.title}</h1>
              </div>
            </header>
            <div className="flex gap-16">
              <span className="flex gap-1 text-xs text-neutral-400">
                <CalendarDaysIcon className="h-4 w-auto" /> Created at{" "}
                {new Date(projectDetails.createdAt).toLocaleDateString("en-CA", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <span className="flex gap-1 text-xs text-neutral-400">
                <ClockIcon className="h-4 w-auto" /> Deadline on{" "}
                {new Date(projectDetails.submissionDeadline).toLocaleDateString("en-CA", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div>
              <div className="flex flex-col">
                <small className="text-xs text-neutral-400">Project Description</small>
                <p className="text-base font-bold text-blue-400">{projectDetails.description}</p>
              </div>
            </div>
          </div>

          {/* Submissions */}
          <div>
            <header>
              <h3 className="text-lg font-semibold text-neutral-400">
                {projectDetails.isGroupProject ? "Groups" : "Students"}
              </h3>
            </header>

            {projectDetails.isGroupProject ? (
              <div></div>
            ) : (
              <div>
                {courseDetails.course.enrolledStudents.map((enrollment, index) => {
                  const studentId = enrollment.student.studentId
                  const studentSubmissions = submissions[studentId] || []
                  return (
                    <details key={index}>
                      <summary className="mb-4 font-bold text-neutral-400">
                        {enrollment.student.fname} {enrollment.student.lname}
                      </summary>
                      <div>
                        {studentSubmissions.length > 0 ? (
                          <table className="w-full border-collapse border border-neutral-300 text-left text-sm text-neutral-400">
                            <thead>
                              <tr className="bg-neutral-100">
                                <th className="border border-neutral-300 px-4 py-2">Submission Date</th>
                                <th className="border border-neutral-300 px-4 py-2">File</th>
                                <th className="border border-neutral-300 px-4 py-2">Description</th>
                                <th className="border border-neutral-300 px-4 py-2">Feedback</th>
                                <th className="border border-neutral-300 px-4 py-2">Status</th>
                                <th className="border border-neutral-300 px-4 py-2">Points</th>
                                <th className="border border-neutral-300 px-4 py-2">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="text-neutral-500">
                              {studentSubmissions.map((submission) => (
                                <tr key={submission.submissionId}>
                                  <td className="border border-neutral-300 px-4 py-2">
                                    {new Date(submission.submissionDate).toLocaleDateString()}
                                  </td>
                                  <td className="border border-neutral-300 px-4 py-2">
                                    {submission.fileURL ? (
                                      <>
                                        <button
                                          type="button"
                                          onClick={() => handleFileView(submission.fileURL)}
                                          className="ml-2 text-blue-400 hover:underline"
                                        >
                                          View File
                                        </button>
                                      </>
                                    ) : (
                                      "No file"
                                    )}
                                  </td>
                                  <td className="border border-neutral-300 px-4 py-2">{submission.description}</td>
                                  <td className="border border-neutral-300 px-4 py-2">
                                    {submission.feedback || "No feedback yet"}
                                  </td>
                                  <td className="border border-neutral-300 px-4 py-2">
                                    {submission.status || "No status"}
                                  </td>
                                  <td className="border border-neutral-300 px-4 py-2">
                                    {submission.status === "Accepted" ? (
                                      <span>
                                        {submission.accumulatedPoints}/{submission.assignedToProject.totalPoints}
                                      </span>
                                    ) : (
                                      <span>--/{submission.assignedToProject.totalPoints}</span>
                                    )}
                                  </td>
                                  <td className="border border-neutral-300 px-4 py-2">
                                    <button type="button" onClick={() => handleDeleteSubmission(submission)}>
                                      <TrashIcon className="w-4 fill-red-400" />
                                    </button>
                                    <button type="button" onClick={() => showEditSubmissionModal(submission)}>
                                      <PencilSquareIcon className="w-4 fill-blue-400" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <p className="text-neutral-400">No submissions yet</p>
                        )}
                      </div>
                    </details>
                  )
                })}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  )
}
