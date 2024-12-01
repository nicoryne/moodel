import React from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../middleware/AuthProvider"
import { getAllCourses, deleteCourse, updateCourse } from "../../services"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid"
import Modal from "../../components/Modal"

export default function AdminCourses() {
  const navigate = useNavigate()
  const [coursesList, setCoursesList] = React.useState([])
  const [modalProps, setModalProps] = React.useState(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const { cookies, isAuthenticated } = useAuth()

  const headers = [
    { name: "Title", key: "title" },
    { name: "Description", key: "description" },
    { name: "Created At", key: "createdAt" },
    { name: "Enrolled Students", key: "enrolledStudents" },
    { name: "Owned By Teachers", key: "ownedByTeachers" },
    { name: "Actions", key: "actions" },
  ]

  React.useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courses = await getAllCourses(cookies.token)
        setCoursesList(courses)
      } catch (error) {
        console.log(error)
      }
    }

    fetchCourses()
  }, [cookies])

  const handleDelete = (courseId) => {
    setModalProps({
      title: "Delete Course",
      message: "Are you sure you want to delete this course?",
      type: "OK",
      onConfirm: async () => {
        try {
          await deleteCourse(courseId, cookies.token)
          setCoursesList((prev) => prev.filter((course) => course.courseId !== courseId))
          setIsModalOpen(false)
        } catch (error) {
          console.error(error)
        }
      },
      onCancel: () => setIsModalOpen(false),
    })
    setIsModalOpen(true)
  }

  const handleEdit = (courseId) => {
    const course = coursesList.find((c) => c.courseId === courseId)
    setModalProps({
      title: "Edit Course",
      message: `Edit details for ${course.title}.`,
      type: "Edit",
      onConfirm: async (updatedData) => {
        try {
          await updateCourse(courseId, updatedData, cookies.token)
          setIsModalOpen(false)
        } catch (error) {
          console.error(error)
        }
      },
      onCancel: () => setIsModalOpen(false),
      course, // Pass course data for editing
    })
    setIsModalOpen(true)
  }

  return (
    <>
      <h1 className="mb-8 text-center text-4xl font-bold text-blue-400">All Courses</h1>
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {headers.map((header) => (
                    <th
                      key={header.key}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      {header.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {coursesList.map((course) => (
                  <tr key={course.courseId}>
                    {headers.slice(0, -1).map((header) => (
                      <td key={header.key} className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                        {header.key === "createdAt"
                          ? new Date(course[header.key]).toLocaleDateString()
                          : header.key === "enrolledStudents" || header.key === "ownedByTeachers"
                            ? course[header.key].join(", ")
                            : course[header.key]}
                      </td>
                    ))}
                    <td className="flex space-x-2 whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      <button onClick={() => handleEdit(course.courseId)} className="text-blue-600 hover:text-blue-900">
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button onClick={() => handleDelete(course.courseId)} className="text-red-600 hover:text-red-900">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Render Modal */}
      {isModalOpen && <Modal ModalProps={modalProps} />}
    </>
  )
}
