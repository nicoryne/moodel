import React from "react"
import { AcademicCapIcon, CheckIcon, XMarkIcon, CalendarIcon } from "@heroicons/react/20/solid"
import { updateStudentCourseEnrollment, teacherGetByEmail, deleteStudentCourseEnrollment } from "../../services/index"
import Modal from "../../components/Modal"
import { useAuth } from "../../middleware/AuthProvider"

export default function TeacherCourseRequest({ request, token, onRequestHandled }) {
  const { reloadUser } = useAuth()
  const enrollmentInfo = request

  const [modalProps, setModalProps] = React.useState(null)

  const handleAccept = async () => {
    const { courseId, studentId, createdAt } = enrollmentInfo

    if (!courseId || !studentId) {
      console.error("Missing courseId or studentId")
      return
    }

    const formData = {
      studentCourseId: {
        courseId,
        studentId,
      },
      createdAt: createdAt,
      isVerified: true,
    }

    try {
      await updateStudentCourseEnrollment(formData, token)

      setModalProps({
        title: "Success",
        message: "Enrollment request accepted successfully!",
        type: "success",
      })

      setTimeout(async () => {
        reloadUser()
        onRequestHandled()
        setModalProps(null)
      }, 2000)
    } catch (error) {
      console.error("Error accepting enrollment request:", error)

      setModalProps({
        title: "Error",
        message: "Failed to accept enrollment request. Please try again.",
        type: "error",
        onCancel: () => setModalProps(null),
      })
    }
  }
  return (
    <>
      {modalProps && <Modal ModalProps={modalProps} />}
      <div className="flex justify-between rounded border-2 border-blue-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4">
          <div className="flex place-items-center gap-1">
            <h4 className="text-sm font-semibold text-blue-400">{enrollmentInfo.studentName}</h4>
            <p className="text-xs text-neutral-400">wishes to enroll to</p>
            <h4 className="text-sm font-semibold text-blue-400">{enrollmentInfo.courseTitle}</h4>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex place-items-center gap-2 text-xs text-neutral-400">
              <AcademicCapIcon className="h-auto w-4" />
              <p>Student's Email: {enrollmentInfo.studentEmail}</p>
            </div>
            <div className="flex place-items-center gap-2 text-xs text-neutral-400">
              <CalendarIcon className="h-auto w-4" />
              <p>Enrolled on {new Date(enrollmentInfo.createdAt).toLocaleDateString("en-CA")}</p>
            </div>
          </div>
        </div>
        <div className="flex place-items-center gap-2 text-xs">
          <button className="flex place-items-center gap-1 rounded-md bg-neutral-400 px-4 py-2 font-bold text-white">
            <XMarkIcon className="h-auto w-4" />
            Deny
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="flex place-items-center gap-1 rounded-md bg-blue-400 px-6 py-2 font-bold text-white"
          >
            <CheckIcon className="h-auto w-4" />
            Accept
          </button>
        </div>
      </div>
    </>
  )
}
