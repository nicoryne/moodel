import { useLocation } from "react-router-dom"

export default function TeacherCourseView() {
  const location = useLocation()
  const { courseDetails } = location.state || {}

  if (!courseDetails) {
    return <p>No course details available.</p>
  }

  return (
    <div>
      <h1>{courseDetails.course.title}</h1>
      <p>{courseDetails.course.description}</p>
      {/* Render other details as needed */}
    </div>
  )
}
