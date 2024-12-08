import React from "react"
import { useAuth } from "../../middleware/AuthProvider"
import { studentGetAll, studentDeleteById, updateStudent } from "../../services"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid"
import Modal from "../../components/Modal"
import { getAge } from "../../lib/utils/getAge"

export default function AdminStudents() {
  const [studentsList, setStudentsList] = React.useState([])
  const [modalProps, setModalProps] = React.useState(null)
  const { cookies, reloadUser } = useAuth()

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
        const students = await studentGetAll(cookies.token)
        setStudentsList(students)
      } catch (error) {
        console.log(error)
      }
    }

    fetchStudents()
  }, [cookies])

  const handleDelete = (studentId) => {
    setModalProps({
      title: "Delete Student",
      message: "Are you sure you want to delete this student?",
      type: "warning",
      onConfirm: async () => {
        try {
          await studentDeleteById(studentId, cookies.token)
          setStudentsList((prev) => prev.filter((student) => student.studentId !== studentId))
          setModalProps({
            title: "Success",
            message: "Student deleted successfully!",
            type: "success",
            onCancel: () => setModalProps(null),
          })

          setTimeout(() => {
            reloadUser()
            setModalProps(null)
          }, 2000)
        } catch (error) {
          console.error(error)
        }
      },
      onCancel: () => setModalProps(null),
    })
  }

  // Edit Student
  const [studentToEdit, setStudentToEdit] = React.useState(null)
  const [editStudentModal, setEditStudentModal] = React.useState(false)
  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [phoneNumber, setPhoneNumber] = React.useState("")
  const [birthdate, setBirthDate] = React.useState("")
  const [address, setAddress] = React.useState("")

  const handleEdit = (student) => {
    setStudentToEdit(student)
    setEditStudentModal(true)
  }

  const cancelUpdateDetails = () => {
    setFirstName("")
    setLastName("")
    setBirthDate("")
    setAddress("")
    setPhoneNumber("")
    setModalProps(null)
    setEditStudentModal(false)
  }

  const handleEditProfile = () => {
    setModalProps({
      title: "Account Update",
      message: "Are you sure you want to update this student?",
      type: "warning",
      onCancel: () => cancelUpdateDetails(null),
      onConfirm: () => {
        editProfile()
      },
    })
  }

  const editProfile = () => {
    if (studentToEdit) {
      let formData = {
        studentId: studentToEdit.studentId,
      }

      if (lastName) formData.lname = lastName
      if (firstName) formData.fname = firstName
      if (birthdate) {
        formData.birthDate = birthdate
        formData.age = getAge(birthdate)
      }
      if (phoneNumber) formData.phoneNumber = phoneNumber
      if (address) formData.address = address

      updateStudent(formData, cookies.token)
        .then(() => {
          reloadUser()
          setModalProps({
            title: "Success",
            message: "Student updated successfully!",
            type: "success",
            onCancel: () => cancelUpdateDetails(null),
          })

          setTimeout(() => {
            cancelUpdateDetails(null)
          }, 2000)
        })
        .catch((error) => {
          console.error("Error updating student:", error)
          setModalProps({
            title: "Error",
            message: "Failed to update student. Please try again.",
            type: "error",
            onCancel: () => cancelUpdateDetails(null),
          })
        })
    } else {
      setModalProps({
        title: "Invalid Input",
        message: "Invalid student or missing fields.",
        type: "warning",
        onCancel: () => cancelUpdateDetails(null),
      })
    }
  }

  return (
    <>
      {editStudentModal && (
        <Modal
          ModalProps={{
            title: `Editing Course`,
            type: "OK",
            children: (
              <form className="flex flex-col gap-8">
                <div className="flex flex-col gap-1">
                  <label htmlFor="fname" className="text-sm font-semibold text-neutral-500">
                    First Name
                  </label>
                  <input
                    id="fname"
                    name="fname"
                    type="text"
                    className="resize-none rounded border-2 p-2 text-neutral-600 focus:outline-blue-400"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  ></input>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="lname" className="text-sm font-semibold text-neutral-500">
                    Last Name
                  </label>
                  <input
                    id="lname"
                    name="lname"
                    type="text"
                    className="resize-none rounded border-2 p-2 text-neutral-600 focus:outline-blue-400"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  ></input>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="phoneNumber" className="text-sm font-semibold text-neutral-500">
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    className="resize-none rounded border-2 p-2 text-neutral-600 focus:outline-blue-400"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  ></input>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="birthdate" className="text-sm font-semibold text-neutral-500">
                    Birthdate
                  </label>
                  <input
                    id="birthdate"
                    name="birthdate"
                    type="date"
                    className="resize-none rounded border-2 p-2 text-neutral-600 focus:outline-blue-400"
                    value={birthdate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  ></input>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="address" className="text-sm font-semibold text-neutral-500">
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    className="resize-none rounded border-2 p-2 text-neutral-600 focus:outline-blue-400"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></input>
                </div>
              </form>
            ),
            onCancel: () => cancelUpdateDetails(),
            onConfirm: () => handleEditProfile(),
          }}
        />
      )}
      {modalProps && <Modal ModalProps={modalProps} />}
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
                        type="button"
                        onClick={() => handleEdit(student)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
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
