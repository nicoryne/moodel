import React from "react"
import Modal from "../../components/Modal"
import {
  HomeIcon,
  UserCircleIcon,
  EnvelopeIcon,
  CakeIcon,
  BriefcaseIcon,
  PhoneIcon,
  KeyIcon,
} from "@heroicons/react/20/solid"
import moodel_dark from "../../assets/moodel-logo-dark.png"
import { useNavigate } from "react-router-dom"
import { TeacherContext } from "./teacher-layout"
import { motion } from "framer-motion"
import { useAuth } from "../../middleware/AuthProvider"
import { getAge } from "../../lib/utils/getAge"
import { updateTeacher, teacherDeleteById } from "../../services/index"

export default function TeacherProfile() {
  const navigate = useNavigate()
  const { cookies, updateUser, removeAuth } = useAuth()
  const userDetails = React.useContext(TeacherContext)

  const [modalProps, setModalProps] = React.useState(null)
  const [showPasswordModal, setShowPasswordModal] = React.useState(false)
  const [isDefaultFields, setIsDefaultFields] = React.useState(false)

  const [firstName, setFirstName] = React.useState(userDetails.fname)
  const [lastName, setLastName] = React.useState(userDetails.lname)
  const [email, setEmail] = React.useState(userDetails.email)
  const [phoneNumber, setPhoneNumber] = React.useState(userDetails.phoneNumber)
  const [birthdate, setBirthDate] = React.useState(userDetails.birthdate)
  const [address, setAddress] = React.useState(userDetails.address)

  const [newPassword, setNewPassword] = React.useState(userDetails.password)
  const [confirmPassword, setConfirmPassword] = React.useState(userDetails.password)

  const fields = React.useMemo(
    () => [firstName, lastName, email, phoneNumber, address, birthdate],
    [firstName, lastName, email, phoneNumber, address, birthdate],
  )

  const details = React.useMemo(
    () => [
      userDetails.fname,
      userDetails.lname,
      userDetails.email,
      userDetails.phoneNumber,
      userDetails.address,
      userDetails.birthdate,
    ],
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
    setEmail(userDetails.email)
    setBirthDate(userDetails.birthdate)
    setAddress(userDetails.address)
  }

  const handleEditProfile = () => {
    if (cookies.user && !isDefaultFields) {
      let formData = {
        teacherId: cookies.user.teacherId,
      }

      if (email) formData.email = email
      if (lastName) formData.lname = lastName
      if (firstName) formData.fname = firstName
      if (birthdate) {
        formData.birthDate = birthdate
        formData.age = getAge(birthdate)
      }
      if (phoneNumber) formData.phoneNumber = phoneNumber
      if (address) formData.address = address

      updateTeacher(formData, cookies.token)
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
    if (!newPassword || newPassword !== confirmPassword) {
      setModalProps({
        title: "Error",
        message: "Passwords do not match or are invalid.",
        type: "error",
        onCancel: () => setModalProps(null),
      })
      return
    }

    updateTeacher({ teacherId: cookies.user.teacherId, password: newPassword }, cookies.token)
      .then(() => {
        setModalProps({
          title: "Success",
          message: "Password updated successfully!",
          type: "success",
          onCancel: () => setModalProps(null),
        })
        setShowPasswordModal(false)
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

  const handleDeleteAccount = () => {
    setModalProps({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete your account? This action cannot be undone.",
      type: "warning",
      onCancel: () => setModalProps(null),
      onConfirm: () => {
        deleteAccount()
      },
    })
  }

  const deleteAccount = () => {
    if (cookies.user) {
      teacherDeleteById(cookies.user.teacherId, cookies.token)
        .then(() => {
          setModalProps(
            {
              title: "Account Deleted",
              message: "Your account has been successfully deleted.",
              type: "success",
            },
            setTimeout(() => {
              removeAuth()
              navigate("/login")
            }, 2000),
          )
        })
        .catch((error) => {
          console.error("Error deleting account:", error)
          setModalProps({
            title: "Error",
            message: "Failed to delete account. Please try again later.",
            type: "error",
            onCancel: () => setModalProps(null),
          })
        })
    } else {
      setModalProps({
        title: "Invalid Request",
        message: "No user is logged in to delete.",
        type: "error",
        onCancel: () => setModalProps(null),
      })
    }
  }

  if (!userDetails) return <div>Loading...</div>

  return (
    <section id="profile" className="space-y-8 p-8">
      {/* Modal */}
      {showPasswordModal && (
        <Modal
          ModalProps={{
            title: "Change Password",
            type: "OK",
            children: (
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-600">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full rounded border p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-600">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded border p-2"
                  />
                </div>
              </form>
            ),
            onCancel: () => setShowPasswordModal(false),
            onConfirm: handlePasswordChange,
          }}
        />
      )}
      {modalProps && <Modal ModalProps={modalProps} />}
      <header>
        <h1 className="w-fit text-2xl font-bold text-blue-400">Hey, {userDetails.fname} 👋</h1>
      </header>

      <div className="flex flex-col gap-8 md:flex-row">
        {/* Account Details */}
        <div className="flex w-fit flex-col gap-4 rounded-lg border-2 border-blue-50 p-8 shadow-md md:place-items-start">
          <div className="flex w-full justify-between">
            <header className="flex items-center gap-1">
              <UserCircleIcon className="h-auto w-8 fill-blue-400" />
              <h2 className="w-fit text-base font-bold text-blue-400 md:text-lg">Account Details</h2>
            </header>
          </div>
          <form className="flex flex-col gap-8 md:flex-row md:place-items-start">
            <div className="mt-4 space-y-4 md:mt-2">
              {/* Name Group */}
              <div className="gap-8 space-y-4 md:flex md:space-y-0">
                {/* First Name */}
                <div>
                  <div className="flex border-b-2 border-blue-300 hover:border-blue-400">
                    <input
                      name="fname"
                      id="fname"
                      value={firstName}
                      className="text-md w-full border-none bg-transparent p-1 font-semibold text-neutral-500 outline-none ring-0 focus:ring-0"
                      type="text"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <label htmlFor="fname" className="text-xs text-neutral-400">
                    First Name
                  </label>
                </div>
                {/* Last Name */}
                <div>
                  <div className="flex border-b-2 border-blue-300 hover:border-blue-400">
                    <input
                      name="lname"
                      id="lname"
                      value={lastName}
                      className="text-md w-full border-none bg-transparent p-1 font-semibold text-neutral-500 outline-none ring-0 focus:ring-0"
                      type="text"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <label htmlFor="lname" className="text-xs text-neutral-400">
                    Last Name
                  </label>
                </div>
              </div>
              {/* Email */}
              <div>
                <div className="flex border-b-2 border-blue-300 hover:border-blue-400">
                  <EnvelopeIcon className="h-auto w-8 fill-blue-400" />
                  <input
                    name="email"
                    id="email"
                    value={email}
                    className="text-md w-full border-none bg-transparent p-1 font-semibold text-neutral-500 outline-none ring-0 focus:ring-0"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <label htmlFor="email" className="text-xs text-neutral-400">
                  Email Address
                </label>
              </div>
              {/* Phone Number */}
              <div>
                <div className="flex border-b-2 border-blue-300 hover:border-blue-400">
                  <PhoneIcon className="h-auto w-8 fill-blue-400" />
                  <input
                    name="phoneNumber"
                    id="phoneNumber"
                    value={phoneNumber}
                    className="text-md w-full border-none bg-transparent p-1 font-semibold text-neutral-500 outline-none ring-0 focus:ring-0"
                    type="tel"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <label htmlFor="phoneNumber" className="text-xs text-neutral-400">
                  Phone Number
                </label>
              </div>
              {/* Address */}
              <div>
                <div className="flex border-b-2 border-blue-300 hover:border-blue-400">
                  <HomeIcon className="h-auto w-8 fill-blue-400" />
                  <input
                    name="address"
                    id="address"
                    value={address}
                    className="text-md w-full border-none bg-transparent p-1 font-semibold text-neutral-500 outline-none ring-0 focus:ring-0"
                    type="text"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <label htmlFor="address" className="text-xs text-neutral-400">
                  Address
                </label>
              </div>

              <div className="gap-8 space-y-4 md:flex md:space-y-0">
                {/* Birthdate */}
                <div className="flex-1">
                  <div className="flex border-b-2 border-blue-300 hover:border-blue-400">
                    <CakeIcon className="h-auto w-8 fill-blue-400" />
                    <input
                      name="birthdate"
                      id="birthdate"
                      value={birthdate}
                      className="text-md w-full border-none bg-transparent p-1 font-semibold text-neutral-500 outline-none ring-0 focus:ring-0"
                      type="date"
                      onChange={(e) => setBirthDate(e.target.value)}
                    />
                  </div>
                  <label htmlFor="birthdate" className="text-xs text-neutral-400">
                    Birthdate
                  </label>
                </div>

                {/* Hired Date */}
                <div className="flex-1">
                  <div className="flex border-b-2 border-blue-300 hover:border-blue-400">
                    <BriefcaseIcon className="h-auto w-8 fill-blue-400" />
                    <time className="text-md mt-0.5 w-full select-none border-none bg-transparent p-1 font-semibold text-neutral-500 outline-none ring-0 focus:ring-0">
                      {userDetails.createdAt}
                    </time>
                  </div>
                  <label htmlFor="birthdate" className="text-xs text-neutral-400">
                    Hired Date
                  </label>
                </div>
              </div>
              {isDefaultFields && (
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(true)}
                    className="text-xs text-blue-300 transition-colors ease-linear hover:text-blue-400 md:text-sm"
                  >
                    Change Password
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteAccount}
                    className="text-xs text-red-300 transition-colors ease-linear hover:text-red-400 md:text-sm"
                  >
                    Delete Account
                  </button>
                </div>
              )}
              {/* Buttons */}
              {!isDefaultFields && (
                <div className="flex gap-4">
                  <motion.button
                    type="button"
                    className="col-span-2 rounded-md bg-neutral-400 px-2 py-2 font-bold text-white md:px-8"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={cancelUpdateDetails}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="button"
                    className="col-span-2 rounded-md bg-blue-400 px-4 py-2 font-bold text-white md:px-16"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleEditProfile}
                  >
                    Update Details
                  </motion.button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
