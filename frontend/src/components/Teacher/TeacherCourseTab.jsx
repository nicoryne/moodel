import { CalendarDaysIcon, UserGroupIcon } from "@heroicons/react/24/outline"

export default function TeacherCourseTab({ courseData }) {
  return (
    <li className="my-2 flex h-40 w-full flex-col justify-center gap-2 border-t-2 py-4">
      <h3>
        <a
          href="/"
          className="cursor-pointer border-b-2 border-transparent text-xl font-bold text-blue-400 hover:border-blue-400"
        >
          {courseData.course.title}
        </a>
      </h3>
      <div className="">
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
          <UserGroupIcon className="h-4 w-auto" />
          {courseData.course.enrolledStudents.length} students
        </span>
      </div>
    </li>
  )
}
