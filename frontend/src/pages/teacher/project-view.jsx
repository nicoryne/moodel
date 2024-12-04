import React from "react"
import { useLocation, useOutletContext, Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../middleware/AuthProvider"
import { ArrowLeftCircleIcon, PresentationChartLineIcon, CalendarDaysIcon, ClockIcon } from "@heroicons/react/20/solid"

export default function TeacherProjectView() {
  const { cookies, reloadUser } = useAuth()
  const { userDetails } = useOutletContext()

  const location = useLocation()
  const navigate = useNavigate()

  const { projectId, courseId } = location.state || {}
  const [projectDetails, setProjectDetails] = React.useState(null)
  const [courseDetails, setCourseDetails] = React.useState(null)

  React.useEffect(() => {
    if (projectId && userDetails && courseId) {
      const foundCourse = userDetails.courses.find((course) => course.course.courseId === courseId)

      if (foundCourse) {
        setCourseDetails(foundCourse)
      }

      const foundProject = foundCourse.course.projects.find((project) => project.projectId === projectId)

      if (foundProject) {
        setProjectDetails(foundProject)
      }
    }
  }, [projectId, userDetails, courseId])

  console.log(courseDetails.course.enrolledStudents)

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
                return (
                  <>
                    <details key={index}>
                      <summary className="text-neutral-400">
                        {enrollment.student.fname} {enrollment.student.lname}
                      </summary>
                      <p>Test</p>
                    </details>
                  </>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
