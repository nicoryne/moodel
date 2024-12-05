import React from "react"
import { useLocation, useOutletContext } from "react-router-dom"
import {
  BookOpenIcon,
  UserGroupIcon,
  PresentationChartLineIcon,
  CheckCircleIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/solid"
import temp_image from "../../assets/team-members/porter.png"
import StuentProjectTab from "../../components/Student/StudentProjectTab"
import { useAuth } from "../../middleware/AuthProvider"
import { getCourseById } from "../../services"
import StudentProjectTab from "../../components/Student/StudentProjectTab"

export default function StudentCourseView() {
  const { cookies, reloadUser } = useAuth()
  const { userDetails } = useOutletContext()

  const location = useLocation()
  const { courseId } = location.state || {}
  const [courseDetails, setCourseDetails] = React.useState(null)
  const [activeStudents, setActiveStudents] = React.useState([])
  const [teacherList, setTeacherList] = React.useState([])

  React.useEffect(() => {
    async function fetchCourseDetails() {
      try {
        if (courseId) {
          const foundCourse = await getCourseById(courseId, cookies.token)
          if (foundCourse) {
            setCourseDetails(foundCourse)
          }
        }
      } catch (error) {
        console.error("Error fetching course details:", error)
      }
    }
    fetchCourseDetails()
  }, [courseId, cookies.token])

  React.useEffect(() => {
    if (courseDetails) {
      const enrolledStudents = courseDetails.enrolledStudents || []
      setActiveStudents(enrolledStudents.filter((student) => student.isVerified))
      setTeacherList(courseDetails.ownedByTeachers)
    }
  }, [courseDetails])

  return (
    <>
      {courseDetails && (
        <>
          <section className="flex w-full flex-col gap-2 bg-blue-400 p-4">
            <div className="flex place-items-center justify-between border-b-2 py-1">
              <div className="flex place-items-center gap-2">
                <BookOpenIcon className="h-auto w-12 text-white" />
                <div className="flex flex-col">
                  <small className="text-xs text-neutral-100">Course Title</small>
                  <h1 className="text-xl font-bold text-white">{courseDetails.title}</h1>
                </div>
                <div className="mx-20 flex flex-col border-l-2 px-4">
                  <small className="text-xs text-neutral-100">Project Description</small>
                  <p className="text-sm font-semibold text-white">{courseDetails.description}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-8">
                <span className="flex gap-1 text-xs text-white">
                  <UserGroupIcon className="h-4 w-auto" />
                  {courseDetails.enrolledStudents.length}{" "}
                  {courseDetails.enrolledStudents.length === 1 ? "student" : "students"}
                </span>
                <span className="flex gap-1 text-xs text-white">
                  <PresentationChartLineIcon className="h-4 w-auto" />
                  {courseDetails.projects.length} {courseDetails.projects.length === 1 ? "project" : "projects"}
                </span>
                <span className="flex gap-1 text-xs text-white">
                  <BriefcaseIcon className="h-4 w-auto" />
                  {teacherList.length === 1 ? "Teacher: " : "Teachers: "}
                  <ul className="flex flex-col gap-4">
                    {teacherList.map((teacher, index) => (
                      <li key={index}>
                        {teacher.teacher.fname} {teacher.teacher.lname}
                      </li>
                    ))}
                  </ul>
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
              </div>
            </aside>

            <div className="w-full p-8">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold text-neutral-600">Projects</h2>
                <aside className="flex justify-between gap-2">
                  <input
                    className="flex-1 rounded-md border-2 py-2 indent-2 text-sm text-neutral-600 focus:outline-blue-400"
                    type="text"
                    placeholder="Find a project.."
                  />
                </aside>
                <div className="flex flex-col gap-4">
                  {courseDetails.projects.map((project, index) => (
                    <StudentProjectTab key={index} project={project} courseId={courseDetails.courseId} />
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
