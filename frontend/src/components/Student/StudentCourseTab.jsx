import React from "react"
import { CalendarDaysIcon, BriefcaseIcon } from "@heroicons/react/24/solid"
import { tcoGetByCourseId } from "../../services/index"

export default function StudentCourseTab({ courseData, index, token }) {
  const [teacherNames, setTeacherNames] = React.useState([])

  const fetchTeacherFromCourse = async (courseId) => {
    try {
      const courseOwnerships = await tcoGetByCourseId(courseId, token)
      const teachers = courseOwnerships.map((ownership) => `${ownership.teacher.fname} ${ownership.teacher.lname}`)
      setTeacherNames(teachers)
    } catch (error) {
      console.error("Error fetching teacher names:", error)
    }
  }

  React.useEffect(() => {
    if (courseData?.course?.courseId) {
      fetchTeacherFromCourse(courseData.course.courseId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseData, token])

  return (
    <li key={index} className="my-2 flex h-40 w-full flex-col justify-center gap-2 border-t-2 py-4">
      <h3>
        <a
          href="/"
          className="cursor-pointer border-b-2 border-transparent text-xl font-bold text-blue-400 hover:border-blue-400"
        >
          {courseData.course.title}
        </a>
      </h3>
      <div>
        <p className="text-sm text-neutral-400">{courseData.course.description}</p>
      </div>
      <div className="mt-4 flex gap-8">
        <span className="flex gap-1 text-xs text-neutral-600">
          <CalendarDaysIcon className="h-4 w-auto" /> Created at{" "}
          {new Date(courseData.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </span>
        <span className="flex gap-1 text-xs text-neutral-600">
          <BriefcaseIcon className="h-4 w-auto" />
          {teacherNames.length > 0 ? `Teachers: ${teacherNames.join(", ")}` : "No teachers found"}
        </span>
      </div>
    </li>
  )
}
