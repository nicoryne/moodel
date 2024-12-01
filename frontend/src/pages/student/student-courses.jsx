import React from "react"
import { MotionComponent } from "../../components/MotionComponent"
import { StudentContext } from "./student-layout"

export default function StudentCourses() {
  const userDetails = React.useContext(StudentContext)

  if (!userDetails) return <div>Loading...</div>

  return (
    <>
      <h1 className="mb-8 text-center text-4xl font-bold text-blue-400">My Courses</h1>
      {/* Displaying Courses */}
      {userDetails && userDetails.courses && userDetails.courses.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {userDetails.courses.map((courseData, index) => (
            <div
              key={index}
              className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {/* Course Title */}
              <h2 className="text-xl font-semibold text-blue-400">{courseData.course.title || "Untitled Course"}</h2>

              {/* Course Description */}
              <p className="mt-2 text-gray-600">{courseData.course.description || "No description available"}</p>

              {/* Enrollment Date */}
              <p className="mt-4 text-sm text-gray-500">
                Enrollment Date: {new Date(courseData.createdAt).toLocaleDateString()}
              </p>

              {/* Button for course details */}
              <MotionComponent
                as="button"
                className="mt-4 rounded-lg bg-blue-400 px-4 py-2 text-white hover:bg-blue-500 focus:outline-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Details
              </MotionComponent>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-center text-gray-600">No courses found.</p>
      )}
    </>
  )
}
