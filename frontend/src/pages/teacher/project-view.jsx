import React from "react"
import { useLocation, useOutletContext, Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../middleware/AuthProvider"
import { ArrowLeftCircleIcon, PresentationChartLineIcon, CalendarDaysIcon, ClockIcon } from "@heroicons/react/20/solid"
import Modal from "../../components/Modal"
import { getSubmissionsByProjectId, retrieveFile } from "../../services"

export default function TeacherProjectView() {
  const { cookies, reloadUser } = useAuth()
  const { userDetails } = useOutletContext()

  const location = useLocation()
  const navigate = useNavigate()

  const { projectId, courseId } = location.state || {}
  const [projectDetails, setProjectDetails] = React.useState(null)
  const [courseDetails, setCourseDetails] = React.useState(null)
  const [submissions, setSubmissions] = React.useState([])

  const groupSubmissionsByStudent = async () => {
    try {
      const fetchedSubmissions = await getSubmissionsByProjectId(projectId, cookies.token)
      const submissionsArray = Array.isArray(fetchedSubmissions) ? fetchedSubmissions : []

      const groupedSubmissions = submissionsArray.reduce((acc, submission) => {
        const studentId = submission?.ownedByStudent?.studentId
        if (!studentId) {
          console.warn("Submission missing studentId:", submission)
          return acc
        }

        if (!acc[studentId]) {
          acc[studentId] = []
        }

        acc[studentId].push(submission)
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
          const groupedSubmissions = await groupSubmissionsByStudent()
          const submissionsWithFiles = await fetchFilesForSubmissions(groupedSubmissions)

          setSubmissions(submissionsWithFiles)
        }
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, userDetails, courseId, cookies.token])

  // Modal

  return (
    <>
      {projectDetails && courseDetails && (
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

          <div>
            <header>
              <h3 className="text-lg font-semibold text-neutral-400">Students</h3>
            </header>
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
                                    <a
                                      href={submission.fileURL}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-400 hover:underline"
                                    >
                                      View File
                                    </a>
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
                                  {submission.accumulatedPoints}/{submission.assignedToProject.totalPoints}
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
          </div>
        </section>
      )}
    </>
  )
}
