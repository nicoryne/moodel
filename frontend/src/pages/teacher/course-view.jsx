import React from "react"

export default function CourseView({ courseDetails, onBack }) {
  return (
    <section className="space-y-8 p-8">
      <button onClick={onBack} className="mb-4 rounded-md bg-blue-400 px-4 py-2 text-white hover:bg-blue-300">
        Back to Courses
      </button>
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
        <div className="flex justify-center">
          <img
            src={courseDetails.course.image || "https://via.placeholder.com/150"}
            alt={courseDetails.course.title || "Course Image"}
            className="h-32"
          />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-neutral-600">{courseDetails.course.title}</h1>
        <p className="mt-2 text-sm text-neutral-400">{courseDetails.course.description}</p>
        <p className="mt-4 text-sm text-neutral-400">Created At: {courseDetails.createdAt}</p>
      </div>
    </section>
  )
}
