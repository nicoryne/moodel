import React from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../../middleware/AuthProvider"
import { teacherGetAll, teacherDeleteById, updateTeacher } from "../../services"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid"
import Modal from "../../components/Modal"

export default function AdminTeachers() {
  const navigate = useNavigate()
  const [teachersList, setTeachersList] = React.useState([])
  const [modalProps, setModalProps] = React.useState(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const { cookies, isAuthenticated } = useAuth()

  const headers = [
    { name: "First Name", key: "fname" },
    { name: "Last Name", key: "lname" },
    { name: "Email", key: "email" },
    { name: "Phone Number", key: "phoneNumber" },
    { name: "Age", key: "age" },
    { name: "Address", key: "address" },
    { name: "Hired Date", key: "createdAt" },
    { name: "Actions", key: "actions" },
  ]

  React.useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const teachers = await teacherGetAll(cookies.token)
        setTeachersList(teachers)
      } catch (error) {
        console.log(error)
      }
    }

    fetchTeachers()
  }, [cookies])

  const handleDelete = (teacherId) => {
    setModalProps({
      title: "Delete Teacher",
      message: "Are you sure you want to delete this teacher?",
      type: "OK",
      onConfirm: async () => {
        try {
          await teacherDeleteById(teacherId, cookies.token)
          setTeachersList((prev) => prev.filter((teacher) => teacher.teacherId !== teacherId))
          setIsModalOpen(false)
        } catch (error) {
          console.error(error)
        }
      },
      onCancel: () => setIsModalOpen(false),
    })
    setIsModalOpen(true)
  }

  const handleEdit = (teacherId) => {
    const teacher = teachersList.find((t) => t.teacherId === teacherId)
    setModalProps({
      title: "Edit Teacher",
      message: `Edit details for ${teacher.fname} ${teacher.lname}.`,
      type: "Edit",
      onConfirm: async (updatedData) => {
        try {
          await updateTeacher(teacherId, updatedData, cookies.token)
          setIsModalOpen(false)
        } catch (error) {
          console.error(error)
        }
      },
      onCancel: () => setIsModalOpen(false),
      teacher, // Pass teacher data for editing
    })
    setIsModalOpen(true)
  }

  return (
    <>
      <h1 className="mb-8 text-center text-4xl font-bold text-blue-400">All Teachers</h1>
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
                {teachersList.map((teacher) => (
                  <tr key={teacher.teacherId}>
                    {headers.slice(0, -1).map((header) => (
                      <td key={header.key} className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                        {header.key === "createdAt"
                          ? new Date(teacher[header.key]).toLocaleDateString()
                          : teacher[header.key]}
                      </td>
                    ))}
                    <td className="flex space-x-2 whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      <button
                        onClick={() => handleEdit(teacher.teacherId)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(teacher.teacherId)}
                        className="text-red-600 hover:text-red-900"
                      >
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
