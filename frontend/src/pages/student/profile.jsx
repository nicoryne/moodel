import React from "react"
import Modal from "../../components/Modal"
import { PencilSquareIcon } from "@heroicons/react/20/solid"
import temp_image from "../../assets/team-members/porter.png"
import { StudentContext } from "./layout"
import { useAuth } from "../../middleware/AuthProvider"
import { getAge } from "../../lib/utils/getAge"
import { updateStudent } from "../../services/index"

export default function StudentProfile() {
  const { cookies, updateUser } = useAuth()
  const userDetails = React.useContext(StudentContext)

  const [modalProps, setModalProps] = React.useState(null)
  const [isDefaultFields, setIsDefaultFields] = React.useState(false)

  const [firstName, setFirstName] = React.useState(userDetails.fname)
  const [lastName, setLastName] = React.useState(userDetails.lname)
  const [email] = React.useState(userDetails.email)
  const [phoneNumber, setPhoneNumber] = React.useState(userDetails.phoneNumber)
  const [birthdate, setBirthDate] = React.useState(userDetails.birthdate)
  const [address, setAddress] = React.useState(userDetails.address)

  const [currentPassword, setCurrentPassword] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")

  const fields = React.useMemo(
    () => [firstName, lastName, phoneNumber, address, birthdate],
    [firstName, lastName, phoneNumber, address, birthdate],
  )

  const details = React.useMemo(
    () => [userDetails.fname, userDetails.lname, userDetails.phoneNumber, userDetails.address, userDetails.birthdate],
    [userDetails],
  )

  React.useEffect(() => {
    setIsDefaultFields(
      fields.every((field, index) => {
        return field === details[index]
      }),
    )
  }, [fields, details])

  const cancelUpdateDetails = () => {
    setFirstName(userDetails.fname)
    setLastName(userDetails.lname)
    setBirthDate(userDetails.birthdate)
    setAddress(userDetails.address)
    setPhoneNumber(userDetails.phoneNumber)
  }

  const handleEditProfile = () => {
    setModalProps({
      title: "Account Update",
      message: "Are you sure you want to update your account?",
      type: "warning",
      onCancel: () => setModalProps(null),
      onConfirm: () => {
        editProfile()
      },
    })
  }

  const editProfile = () => {
    if (cookies.user && !isDefaultFields) {
      let formData = {
        studentId: cookies.user.studentId,
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
        .then((newTeacher) => {
          updateUser(newTeacher)
          setModalProps({
            title: "Success",
            message: "Profile updated successfully!",
            type: "success",
            onCancel: () => setModalProps(null),
            onConfirm: () => setModalProps(null),
          })

          setTimeout(() => {
            setModalProps(null)
          }, 2000)
        })
        .catch((error) => {
          console.error("Error updating profile:", error)
          setModalProps({
            title: "Error",
            message: "Failed to update profile. Please try again.",
            type: "error",
            onCancel: () => setModalProps(null),
          })
        })
    } else {
      setModalProps({
        title: "Invalid Input",
        message: "Invalid user or missing fields.",
        type: "warning",
        onCancel: () => setModalProps(null),
      })
    }
  }

  const handlePasswordChange = () => {
    setModalProps({
      title: "Password Change",
      message: "Are you sure you want to change your password?",
      type: "warning",
      onCancel: () => setModalProps(null),
      onConfirm: () => {
        editPassword()
      },
    })
  }

  const editPassword = () => {
    if (!newPassword || newPassword !== confirmPassword) {
      setModalProps({
        title: "Error",
        message: "Passwords do not match or are invalid.",
        type: "error",
        onCancel: () => setModalProps(null),
      })
      return
    }

    updateStudent({ teacherId: cookies.user.studentId, password: newPassword }, cookies.token)
      .then(() => {
        setModalProps({
          title: "Success",
          message: "Password updated successfully!",
          type: "success",
          onCancel: () => setModalProps(null),
        })
        setTimeout(() => {
          setModalProps(null)
        }, 2000)
      })
      .catch(() => {
        setModalProps({
          title: "Error",
          message: "Failed to update password. Please try again.",
          type: "error",
          onCancel: () => setModalProps(null),
        })
      })
  }

  if (!userDetails) return <div>Loading...</div>

  return (
    <>
      {modalProps && <Modal ModalProps={modalProps} />}
      <div className="mx-auto flex flex-col gap-8 p-8 md:w-[700px] lg:w-[900px]">
        <header className="w-full border-b-2 border-blue-200 py-4">
          <h2 className="text-2xl font-bold text-blue-400">My Profile</h2>
        </header>
        <div className="grid grid-cols-1 place-items-center md:grid-flow-row-dense md:grid-cols-4 md:place-items-start">
          {/* Profile Picture */}
          <div className="flex flex-col gap-2 md:col-start-4">
            <h3 className="text-base font-semibold text-blue-400">Profile Picture</h3>
            <img className="rounded-full border-2" src={temp_image} width={256} height={256} alt="Profile" />
            <button className="relative bottom-8 left-8 flex w-fit items-center gap-1 rounded bg-neutral-600 p-2 text-xs text-white hover:bg-neutral-500">
              <PencilSquareIcon className="h-auto w-4" />
              Edit
            </button>
          </div>

          <div className="flex w-full flex-col gap-4 md:col-start-1 md:col-end-3">
            {/* Name Group */}
            <div>
              <div className="flex flex-col gap-6 md:flex-row">
                {/* First Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="text-sm font-semibold text-neutral-500">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    name="firstName"
                    id="firstName"
                    className="rounded border-2 indent-2 text-neutral-600 focus:outline-blue-400"
                    onChange={(e) => setLastName(e.target.value)}
                  ></input>
                </div>
                {/* Last Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="text-sm font-semibold text-neutral-500">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    name="lastName"
                    id="lastName"
                    className="rounded border-2 indent-2 text-neutral-600 focus:outline-blue-400"
                    onChange={(e) => setLastName(e.target.value)}
                  ></input>
                </div>
              </div>
              <p className="mt-2 text-xs text-neutral-400">
                Your name may appear around Moodel when you are in a course.
              </p>
            </div>

            {/* Email */}
            <div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold text-neutral-500">Email Address</p>
                <span className="rounded border-2 bg-neutral-200 indent-2 text-neutral-400 focus:outline-blue-400">
                  {email}
                </span>
              </div>
              <p className="mt-2 text-xs text-neutral-400">Your public email address. This cannot be changed.</p>
            </div>

            {/* Address */}
            <div>
              <div className="flex flex-col gap-2">
                <label htmlFor="address" className="text-sm font-semibold text-neutral-500">
                  Address
                </label>
                <input
                  type="address"
                  value={address}
                  name="address"
                  id="address"
                  className="rounded border-2 indent-2 text-neutral-600 focus:outline-blue-400"
                  autoComplete="address"
                  onChange={(e) => setAddress(e.target.value)}
                ></input>
              </div>
              <p className="mt-2 text-xs text-neutral-400">Your physical address. We keep this confidential.</p>
            </div>

            {/* Phone Number */}
            <div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phoneNumber" className="text-sm font-semibold text-neutral-500">
                  Contact Info
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  name="phoneNumber"
                  id="phoneNumber"
                  className="rounded border-2 indent-2 text-neutral-600 focus:outline-blue-400"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                ></input>
              </div>
              <p className="mt-2 text-xs text-neutral-400">Your contact info. This may be displayed on your profile.</p>
            </div>

            {/* Birthdate */}
            <div>
              <div className="flex flex-col gap-2">
                <label htmlFor="birthdate" className="text-sm font-semibold text-neutral-500">
                  Birthdate
                </label>
                <input
                  type="date"
                  value={birthdate}
                  name="birthdate"
                  id="birthdate"
                  className="rounded border-2 indent-1 text-neutral-600 focus:outline-blue-400"
                  onChange={(e) => setBirthDate(e.target.value)}
                ></input>
              </div>
              <p className="mt-2 text-xs text-neutral-400">Your birthdate. This may be displayed on your profile.</p>
            </div>

            {!isDefaultFields && (
              <div className="mt-8 flex w-full justify-between">
                <button
                  type="button"
                  className="rounded-md bg-neutral-500 px-4 py-1 text-sm font-bold text-white hover:bg-neutral-400 active:bg-neutral-600"
                  onClick={(e) => cancelUpdateDetails()}
                >
                  Undo
                </button>

                <button
                  type="button"
                  className="rounded-md bg-green-500 px-4 py-1 text-sm font-bold text-white hover:bg-green-400 active:bg-green-600"
                  onClick={(e) => handleEditProfile()}
                >
                  Update Profile
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Account Settings */}
        <div className="flex flex-col gap-4">
          <header className="w-full border-b-2 border-blue-200 py-4">
            <h2 className="text-2xl font-bold text-blue-400">Account Settings</h2>
          </header>

          <div className="flex w-fit flex-col gap-4">
            <div className="flex flex-col gap-4">
              <h3 className="text-base font-semibold text-blue-400">Change Password</h3>
              <div className="flex flex-col gap-1">
                <label htmlFor="currentPassword" className="text-sm font-semibold text-neutral-500">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  name="currentPassword"
                  id="currentPassword"
                  className="rounded border-2 indent-2 text-neutral-600 focus:outline-blue-400"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  autoComplete="off"
                ></input>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="newPassword" className="text-sm font-semibold text-neutral-500">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  name="newPassword"
                  id="newPassword"
                  className="rounded border-2 indent-2 text-neutral-600 focus:outline-blue-400"
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="off"
                ></input>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="confirmPassword" className="text-sm font-semibold text-neutral-500">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  name="confirmPassword"
                  id="confirmPassword"
                  className="rounded border-2 indent-2 text-neutral-600 focus:outline-blue-400"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="off"
                ></input>
              </div>
            </div>

            <div>
              <button
                className="rounded-md bg-red-500 px-4 py-1 text-sm font-bold text-white hover:bg-red-400 active:bg-red-600"
                onClick={(e) => handlePasswordChange()}
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
