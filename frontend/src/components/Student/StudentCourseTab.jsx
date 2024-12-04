import React from "react"
import { CalendarDaysIcon, BriefcaseIcon } from "@heroicons/react/24/outline"
import { Link, useLocation } from "react-router-dom"
import { tcoGetByCourseId } from "../../services"
import { useAuth } from "../../middleware/AuthProvider"

export default function StudentCourseTab({ courseData }) {
  const location = useLocation()
  const courseSlug = courseData.course.title.replace(/\s+/g, "-").toLowerCase()

  const { cookies } = useAuth()
  const [teacherData, setTeacherData] = React.useState(null)

  React.useEffect(() => {
    async function fetchData() {
      try {
        const data = await tcoGetByCourseId(courseData.course.courseId, cookies.token)
        setTeacherData({
          fname: data[0].teacher.fname,
          lname: data[0].teacher.lname,
        })
      } catch (error) {
        console.error("Error fetching teacher data:", error)
        setTeacherData(null)
      }
    }
    fetchData()
  }, [courseData.course.courseId, cookies.token])

  return (
    <li className="my-2 flex h-40 w-full justify-between border-t-2 py-4">
      <div className="flex flex-col justify-center gap-2">
        <h3>
          <Link
            to={`${location.pathname.replace(/\/$/, "")}/courses/${courseSlug}`}
            state={{ courseId: courseData.course.courseId }}
            className="cursor-pointer border-b-2 border-transparent text-xl font-bold text-blue-400 hover:border-blue-400"
          >
            {courseData.course.title}
          </Link>
        </h3>
        <div className="">
          <p className="text-sm text-neutral-400">{courseData.course.description}</p>
        </div>
        <div className="mt-4 flex gap-8">
          <span className="flex gap-1 text-xs text-neutral-400">
            <CalendarDaysIcon className="h-4 w-auto" />
            Created at{" "}
            {new Date(courseData.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </span>
          {teacherData && (
            <span className="flex gap-1 text-xs text-neutral-400">
              <BriefcaseIcon className="h-4 w-auto" />
              <p>Teacher: </p>
              <ul>
                <li>
                  {teacherData.fname} {teacherData.lname}
                </li>
              </ul>
            </span>
          )}
        </div>
      </div>
    </li>
  )
}
