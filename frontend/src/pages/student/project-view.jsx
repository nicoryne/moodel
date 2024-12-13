import React from "react"
import { useLocation, useOutletContext, useNavigate } from "react-router-dom"
import { useAuth } from "../../middleware/AuthProvider"
import {
  ArrowLeftCircleIcon,
  PresentationChartLineIcon,
  CalendarDaysIcon,
  ClockIcon,
  UsersIcon,
  UserIcon,
} from "@heroicons/react/20/solid"
import {
  getCourseById,
  getIndividualSubmissionsByProjectId,
  retrieveFile,
  createIndividualSubmission,
} from "../../services"
import Modal from "../../components/Modal"
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer"
import "@cyntler/react-doc-viewer/dist/index.css"

export default function StudentProjectView() {
  const { cookies, reloadUser } = useAuth()
  const { userDetails } = useOutletContext()

  const location = useLocation()
  const navigate = useNavigate()

  const { projectId, courseId } = location.state || {}
  const [projectDetails, setProjectDetails] = React.useState(null)
  const [courseDetails, setCourseDetails] = React.useState(null)

  // Submissions
  const [submissions, setSubmissions] = React.useState(null)
  const [myGroup, setMyGroup] = React.useState(null)

  const fetchFilesForSubmissions = async (submissions) => {
    const updatedSubmissions = []

    for (const submission of submissions) {
      if (submission.fileURL) {
        try {
          const fileUrl = await retrieveFile(submission.fileURL, cookies.token)
          updatedSubmissions.push({ ...submission, fileURL: fileUrl })
        } catch (error) {
          console.error(`Failed to fetch file for submission ${submission.submissionId}:`, error)
          updatedSubmissions.push({ ...submission, fileURL: null })
        }
      } else {
        updatedSubmissions.push(submission)
      }
    }

    return updatedSubmissions
  }

  React.useEffect(() => {
    async function fetchCourseDetails() {
      try {
        if (courseId) {
          const foundCourse = await getCourseById(courseId, cookies.token)
          const submissionsData = await getIndividualSubmissionsByProjectId(
            projectId,
            userDetails.studentId,
            cookies.token,
          )

          if (foundCourse) {
            setCourseDetails(foundCourse)
            setProjectDetails(foundCourse.projects.find((project) => project.projectId === projectId))
          }

          if (submissionsData) {
            const updatedSubmissions = await fetchFilesForSubmissions(submissionsData)
            setSubmissions(updatedSubmissions)
          }

          if (projectDetails && projectDetails.isGroupProject) {
          }
        }
      } catch (error) {
        console.error("Error fetching course details:", error)
      }
    }
    fetchCourseDetails()
  }, [courseId, cookies.token, projectId, userDetails])

  // Modal
  const [showCreateSubmissionsModal, setShowCreateSubmissionModal] = React.useState(false)
  const [modalProps, setModalProps] = React.useState(null)

  const [submissionDescription, setSubmissionDescription] = React.useState("")
  const [submissionFile, setSubmissionFile] = React.useState(null)
  const [fileName, setFileName] = React.useState("No file selected")

  const resetCreateSubmission = () => {
    setModalProps(null)
    setShowCreateSubmissionModal(false)
    setSubmissionDescription("")
    setFileName("No file selected")
  }

  const handleSubmissionCreation = () => {
    setShowCreateSubmissionModal(true)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    const validTypes = [
      "application/pdf", // PDF
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
      "application/vnd.openxmlformats-officedocument.presentationml.presentation", // PPTX
      "application/vnd.ms-powerpoint", // PPT (older PowerPoint format)
      "application/msword", // DOC (older Word format)
      "application/vnd.oasis.opendocument.text", // ODT (OpenDocument Text)
      "application/vnd.oasis.opendocument.presentation", // ODP (OpenDocument Presentation)
      "image/jpeg",
      "image/png",
      "image/webp",
    ]

    if (file) {
      if (!validTypes.includes(file.type)) {
        setModalProps({
          title: "Error",
          message: "Invalid file type. Please upload a PNG, JPEG, WEBP, DOCX, PDF, PPTX, or other supported document.",
          type: "error",
          onCancel: () => setModalProps(null),
        })
        e.target.value = ""
        return
      }

      const maxSizeInBytes = 15 * 1024 * 1024 // 15MB
      if (file.size > maxSizeInBytes) {
        setModalProps({
          title: "Error",
          message: "File size exceeds the 2MB limit. Please upload a smaller file.",
          type: "error",
          onCancel: () => setModalProps(null),
        })
        e.target.value = ""
        return
      }

      setSubmissionFile(file)
      setFileName(file.name)
    }
    e.target.value = ""
  }

  // FileViewer
  const [fileToView, setFileToView] = React.useState(null)

  const handleFileView = (blob) => {
    if (blob) {
      setFileToView(blob)
    }
  }

  const createIndividualSubmissionFunction = () => {
    if (submissionDescription && submissionFile) {
      let formData = {
        submissionDate: new Date(),
        fileURL: submissionFile,
        description: submissionDescription,
        accumulatedPoints: 0,
        assignedToProject: {
          projectId: projectId,
        },
        ownedByStudent: {
          studentId: userDetails.studentId,
        },
      }

      createIndividualSubmission(formData, cookies.token)
        .then(() => {
          setModalProps({
            title: "Success",
            message: "Submission created successfully!",
            type: "success",
          })

          setTimeout(async () => {
            reloadUser()
            resetCreateSubmission()
          }, 2000)
        })
        .catch((error) => {
          console.error("Error creating a submission:", error)
          setModalProps({
            title: "Error",
            message: "Failed to create a submission. Please try again.",
            type: "error",
            onCancel: () => resetCreateSubmission(),
          })
        })
    } else {
      setModalProps({
        title: "Invalid Input",
        message: "Invalid fields.",
        type: "error",
        onCancel: () => resetCreateSubmission(),
      })
    }
  }

  return (
    <>
      {fileToView && (
        <section>
          <aside className="flex w-full">
            <div className="w-full border-b-2 px-4 py-8">
              <button
                type="button"
                onClick={() => setFileToView(null)}
                className="flex cursor-pointer place-items-center gap-2 text-neutral-400 hover:text-blue-400"
              >
                <ArrowLeftCircleIcon className="h-auto w-8" />
                <p>Close file</p>
              </button>
            </div>
          </aside>
          <DocViewer
            documents={[
              {
                uri: fileToView,
              },
            ]}
            pluginRenderers={DocViewerRenderers}
          />
        </section>
      )}
      {showCreateSubmissionsModal && (
        <Modal
          ModalProps={{
            title: "Creating a Submission",
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
                      value={submissionDescription}
                      onChange={(e) => setSubmissionDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="flex place-items-center gap-2">
                    <label
                      htmlFor="project-file"
                      className="cursor-pointer rounded bg-blue-400 p-2 text-sm font-bold text-white hover:bg-blue-500"
                    >
                      Upload your File
                    </label>
                    <input
                      type="file"
                      id="project-file"
                      name="project-file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <small
                      className="block max-w-[200px] overflow-hidden truncate text-ellipsis whitespace-nowrap"
                      title={fileName}
                    >
                      Filename: {fileName}
                    </small>
                  </div>
                </div>
              </form>
            ),
            onCancel: () => resetCreateSubmission(),
            onConfirm: () => createIndividualSubmissionFunction(),
          }}
        />
      )}
      {modalProps && <Modal ModalProps={modalProps} />}
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

          <div className="flex place-items-center justify-between">
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
                <div className="flex flex-col pb-16">
                  <small className="text-xs text-neutral-400">Project Description</small>
                  <p className="text-base font-bold text-blue-400">{projectDetails.description}</p>
                </div>
              </div>
              <div className="flex w-fit flex-col gap-2">
                <button
                  type="button"
                  onClick={() => handleSubmissionCreation()}
                  className="rounded-md bg-blue-400 px-4 py-2 font-bold text-white"
                >
                  Upload a Submission
                </button>

                <span className="flex gap-1 text-xs text-neutral-400">
                  {projectDetails.isGroupProject ? (
                    <UsersIcon className="h-4 w-auto" />
                  ) : (
                    <UserIcon className="h-4 w-auto" />
                  )}
                  This is <strong>{projectDetails.isGroupProject ? "a Group" : "an Individual"}</strong> project.
                </span>

                {projectDetails.isGroupProject && (
                  <span className="flex gap-1 text-xs text-neutral-400">
                    <UsersIcon className="h-4 w-auto" />
                    This is <strong>{projectDetails.isGroupProject ? "a Group" : "an Individual"}</strong> project.
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-12">
            <header>
              <h2 className="border-b-2 border-neutral-200 py-2 text-xl font-semibold text-neutral-400">Submissions</h2>
            </header>
            {submissions && (
              <div>
                {submissions.length > 0 ? (
                  <table className="w-full border-collapse border border-neutral-300 text-left text-sm text-neutral-400">
                    <thead>
                      <tr className="bg-neutral-100">
                        <th className="border border-neutral-300 px-4 py-2">Submission Date</th>
                        <th className="border border-neutral-300 px-4 py-2">File</th>
                        <th className="border border-neutral-300 px-4 py-2">Description</th>
                        <th className="border border-neutral-300 px-4 py-2">Feedback</th>
                        <th className="border border-neutral-300 px-4 py-2">Status</th>
                        <th className="border border-neutral-300 px-4 py-2">Points</th>
                      </tr>
                    </thead>
                    <tbody className="text-neutral-500">
                      {submissions.map((submission) => (
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
                          <td className="border border-neutral-300 px-4 py-2">{submission.status || "No status"}</td>
                          <td className="border border-neutral-300 px-4 py-2">
                            {submission.status === "Accepted" ? (
                              <span>
                                {submission.accumulatedPoints}/{submission.assignedToProject.totalPoints}
                              </span>
                            ) : (
                              <span>--/{submission.assignedToProject.totalPoints}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-neutral-400">No submissions yet</p>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  )
}
