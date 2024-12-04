import { CalendarDaysIcon, UserGroupIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
export default function TeacherCourseTab({ courseData }) {
  return (
    <li className="my-2 flex h-40 w-full flex-col justify-center gap-2 border-t-2 py-4">
      <h3>
        <Link
          to={`/teacher/course/${courseData.course.title.replace(/\s+/g, "-").toLowerCase()}`}
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
          <CalendarDaysIcon className="h-4 w-auto" /> Created at{" "}
          {new Date(courseData.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </span>
        <span className="flex gap-1 text-xs text-neutral-400">
          <UserGroupIcon className="h-4 w-auto" />
          {courseData.course.enrolledStudents.length}{" "}
          {courseData.course.enrolledStudents.length === 1 ? "student" : "students"}
        </span>
      </div>
    </li>
  )
}
