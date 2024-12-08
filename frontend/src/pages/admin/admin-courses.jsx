import React from "react"
import { useAuth } from "../../middleware/AuthProvider"
import { getAllCourses, deleteCourse, updateCourse } from "../../services"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid"
import Modal from "../../components/Modal"

export default function AdminCourses() {
  const [coursesList, setCoursesList] = React.useState([])
  const { cookies, reloadUser } = useAuth()

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

  // Modal
  const [modalProps, setModalProps] = React.useState(null)
  const [editCourseModal, setEditCourseModal] = React.useState(false)
  const [courseDescription, setCourseDescription] = React.useState("")
  const [courseData, setCourseData] = React.useState(null)

  const handleEditCourse = (course) => {
    setEditCourseModal(true)
    setCourseData(course)
  }

  const editCourseFunction = () => {
    if (courseDescription) {
      let courseId = courseData.courseId
      let formData = {
        courseId: courseId,
        description: courseDescription,
      }

      updateCourse(formData, cookies.token)
        .then(() => {
          setModalProps({
            title: "Success",
            message: "Course has been sucessfully edited!",
            type: "success",
            onCancel: () => resetEditCourse(),
          })

          setTimeout(() => {
            resetEditCourse()
            reloadUser()
          }, 2000)
        })
        .catch(() => {
          setModalProps({
            title: "Error",
            message: "Failed to edit course. Please try again.",
            type: "error",
            onCancel: () => resetEditCourse(),
          })
        })
    }
  }

  const resetEditCourse = () => {
    setEditCourseModal(false)
    setCourseDescription("")
    setModalProps(null)
  }

  // Delete
  const handleDeleteCourse = () => {
    setModalProps({
      title: `Deleting Course: ${courseData.title}`,
      message: "Are you sure you want to delete this course? This action is irreversible.",
      type: "warning",
      onCancel: () => setModalProps(null),
      onConfirm: () => {
        deleteCourseFunction()
        setModalProps(null)
      },
    })
  }

  const deleteCourseFunction = () => {
    deleteCourse(courseData.courseId, cookies.token)
      .then(() => {
        setModalProps({
          title: "Success",
          message: "Course has been sucessfully deleted!",
          type: "success",
          onCancel: () => setModalProps(null),
        })

        setTimeout(() => {
          setModalProps(null)
          reloadUser()
        }, 2000)
      })
      .catch(() => {
        setModalProps({
          title: "Error",
          message: "Failed to delete course. Please try again.",
          type: "error",
          onCancel: () => setModalProps(null),
        })
      })
  }

  return (
    <>
      {editCourseModal && (
        <Modal
          ModalProps={{
            title: `Editing Course`,
            type: "OK",
            children: (
              <form className="flex flex-col gap-8">
                <div className="flex flex-col gap-1">
                  <label htmlFor="course-description" className="text-sm font-semibold text-neutral-500">
                    Description
                  </label>
                  <textarea
                    id="course-description"
                    name="course-description"
                    rows="3"
                    className="resize-none rounded border-2 p-2 text-neutral-600 focus:outline-blue-400"
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                  ></textarea>
                </div>
              </form>
            ),
            onCancel: () => resetEditCourse(),
            onConfirm: () => editCourseFunction(),
          }}
        />
      )}
      {modalProps && <Modal ModalProps={modalProps} />}
      <h1 className="mb-8 text-center text-4xl font-bold text-blue-400">All Courses</h1>
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Created At
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Enrolled Students
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Owned By Teachers
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {coursesList.map((course) => (
                  <tr key={course.courseId}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{course.title}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {course.description}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {new Date(course.createdAt).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {course.enrolledStudents.length > 0
                        ? course.enrolledStudents
                            .map((data) => `${data.student.fname} ${data.student.lname}`)
                            .join(", ")
                        : "None"}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {course.ownedByTeachers.length > 0
                        ? course.ownedByTeachers.map((data) => `${data.teacher.fname} ${data.teacher.lname}`).join(", ")
                        : "None"}
                    </td>
                    <td className="flex space-x-2 whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      <button onClick={() => handleEditCourse(course)} className="text-blue-600 hover:text-blue-900">
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button onClick={() => handleDeleteCourse(course)} className="text-red-600 hover:text-red-900">
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
    </>
  )
}
