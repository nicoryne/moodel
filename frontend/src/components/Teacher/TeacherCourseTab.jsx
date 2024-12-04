import React from "react"
import { CalendarDaysIcon, UserGroupIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline"
import { Link, useLocation } from "react-router-dom"
import Modal from "../../components/Modal"
import { deleteCourse, updateCourse } from "../../services"
import { useAuth } from "../../middleware/AuthProvider"

export default function TeacherCourseTab({ courseData }) {
  const location = useLocation()
  const courseSlug = courseData.course.title.replace(/\s+/g, "-").toLowerCase()

  const { cookies, reloadUser } = useAuth()
  const [showOptions, setShowOptions] = React.useState(false)

  // Modal
  const [modalProps, setModalProps] = React.useState(null)
  const [editCourseModal, setEditCourseModal] = React.useState(false)

  const [courseDescription, setCourseDescription] = React.useState("")

  const editCourseFunction = () => {
    if (courseDescription) {
      let courseId = courseData.course.courseId
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
    setShowOptions(false)
    setModalProps(null)
  }

  // Delete
  const handleDeleteCourse = () => {
    setModalProps({
      title: `Deleting Course: ${courseData.course.title}`,
      message: "Are you sure you want to delete this course? This action is irreversible.",
      type: "warning",
      onCancel: () => setModalProps(null),
      onConfirm: () => {
        deleteCourseFunction()
        setShowOptions(false)
        setModalProps(null)
      },
    })
  }

  const deleteCourseFunction = () => {
    deleteCourse(courseData.course.courseId, cookies.token)
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
    <li className="my-2 flex h-40 w-full justify-between border-t-2 py-4">
      {editCourseModal && (
        <Modal
          ModalProps={{
            title: `Editing Course: ${courseData.course.title}`,
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
      </div>
      <div className="flex place-items-center">
        <button
          type="button"
          className="text-neutral-400 hover:text-blue-400"
          onClick={() => setShowOptions(!showOptions)}
        >
          <EllipsisVerticalIcon className="h-auto w-8" />
        </button>
        {showOptions && (
          <div className="relative">
            <div className="absolute right-4 top-4 flex w-36 flex-col gap-2 rounded-l-2xl rounded-br-2xl border-2 border-neutral-400 p-2 shadow-md">
              <button
                type="button"
                className="text-xs font-semibold text-neutral-400 hover:text-blue-400"
                onClick={() => setEditCourseModal(!editCourseModal)}
              >
                Edit Course
              </button>
              <button
                type="button"
                className="text-xs font-semibold text-neutral-400 hover:text-red-400"
                onClick={handleDeleteCourse}
              >
                Delete Course
              </button>
            </div>
          </div>
        )}
      </div>
    </li>
  )
}
