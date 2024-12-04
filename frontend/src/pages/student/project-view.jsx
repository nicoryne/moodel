import React from "react"
import { useLocation, useOutletContext, Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../middleware/AuthProvider"
import {
  ArrowLeftCircleIcon,
  PresentationChartLineIcon,
  CalendarDaysIcon,
  ClockIcon,
  UserIcon,
} from "@heroicons/react/20/solid"
import { getCourseById, getIndividualSubmissionsByProjectId } from "../../services"

export default function StudentProjectView() {
  const { cookies, reloadUser } = useAuth()
  const { userDetails } = useOutletContext()

  const location = useLocation()
  const navigate = useNavigate()

  const { projectId, courseId } = location.state || {}
  const [projectDetails, setProjectDetails] = React.useState(null)
  const [courseDetails, setCourseDetails] = React.useState(null)
  const [submissions, setSubmissions] = React.useState(null)

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
            setSubmissions(submissionsData)
            console.log(submissions)
          }
        }
      } catch (error) {
        console.error("Error fetching course details:", error)
      }
    }
    fetchCourseDetails()
  }, [courseId, cookies.token, projectId, userDetails.studentId])

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
                <button className="rounded-md bg-blue-400 px-4 py-2 font-bold text-white">Upload a Submission</button>

                <span className="flex gap-1 text-xs text-neutral-400">
                  <UserIcon className="h-4 w-auto" />
                  This is an <strong>Individual</strong> project. Submissions are graded individually.
                </span>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <header>
              <h2 className="border-b-2 border-neutral-200 py-2 text-xl font-semibold text-neutral-400">Submissions</h2>
            </header>
            {submissions && (
              <div>
                {submissions.map((submission, index) => (
                  <div key={index}>{submission.feedback}</div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  )
}
