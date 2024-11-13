import React from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../middleware/AuthProvider"
import { studentGetAll, studentDeleteById, updateStudent } from "../../services"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid"

export default function AdminStudentsClient() {
  const navigate = useNavigate()
  const [studentsList, setStudentsList] = React.useState([])
  const { user, token, isAuthenticated } = useAuth()

  const headers = [
    { name: "First Name", key: "fname" },
    { name: "Last Name", key: "lname" },
    { name: "Email", key: "email" },
    { name: "Phone Number", key: "phoneNumber" },
    { name: "Age", key: "age" },
    { name: "Address", key: "address" },
    { name: "Enrolled Date", key: "createdAt" },
    { name: "Actions", key: "actions" },
  ]

  React.useEffect(() => {
    const fetchStudents = async () => {
      try {
        const students = await studentGetAll(token)
        setStudentsList(students)
      } catch (error) {
        console.log(error)
      }
    }

    fetchStudents()
  }, [token])

  const handleDelete = (studentId) => {
    // TODO: delete
  }

  const handleEdit = (studentId) => {
    // TODO: Edit
  }

  return (
    <>
      <h1 className="mb-8 text-center text-4xl font-bold text-blue-400">All Students</h1>
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
                {studentsList.map((student) => (
                  <tr key={student.studentId}>
                    {headers.slice(0, -1).map((header) => (
                      <td key={header.key} className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                        {header.key === "createdAt"
                          ? new Date(student[header.key]).toLocaleDateString()
                          : student[header.key]}
                      </td>
                    ))}
                    <td className="flex space-x-2 whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      <button
                        onClick={() => handleEdit(student.studentId)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(student.studentId)}
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
    </>
  )
}
