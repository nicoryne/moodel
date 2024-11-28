import React from "react"
import { useNavigate } from "react-router-dom"
import moodel_dark from "../../assets/moodel-logo-dark.png"
import { PencilSquareIcon, UserCircleIcon, EnvelopeIcon, CakeIcon, BriefcaseIcon } from "@heroicons/react/20/solid"
import { TeacherContext } from "./teacher-layout"
import { motion } from "framer-motion"

export default function TeacherProfile() {
  const navigate = useNavigate()
  const userDetails = React.useContext(TeacherContext)
  const [isDefaultFields, setIsDefaultFields] = React.useState(false)

  const [firstName, setFirstName] = React.useState(userDetails.fname)
  const [lastName, setLastName] = React.useState(userDetails.lname)
  const [email, setEmail] = React.useState(userDetails.email)
  const [birthdate, setBirthDate] = React.useState(userDetails.birthdate)

  const fields = [firstName, lastName, email, birthdate]
  const details = [userDetails.fname, userDetails.lname, userDetails.email, userDetails.birthdate]

  React.useEffect(() => {
    setIsDefaultFields(
      fields.every((field, index) => {
        return field === details[index]
      }),
    )
  }, [firstName, lastName, email, birthdate])

  const cancelUpdateDetails = () => {
    setFirstName(userDetails.fname)
    setLastName(userDetails.lname)
    setEmail(userDetails.email)
    setBirthDate(userDetails.birthdate)
  }

  const handleEditProfile = () => {
    navigate("/teacher/edit")
  }

  if (!userDetails) return <div>Loading...</div>

  return (
    <section id="profile" className="space-y-8 p-8">
      <header>
        <h1 className="w-fit text-2xl font-bold text-blue-400">Hello, {userDetails.fname}</h1>
      </header>
      <div className="rounded-lg border-2 border-blue-50 p-8 shadow-md md:place-items-start">
        <form className="flex flex-col justify-between gap-8 md:flex-row md:place-items-start">
          <div className="mx-auto h-auto w-64 rounded-full bg-blue-50 hover:cursor-pointer hover:opacity-20 md:mx-0">
            <img src={moodel_dark} alt="Placeholder Profile" />
          </div>
          <div className="mt-4 space-y-4 md:mt-2">
            {/* Name Group */}
            <div className="gap-8 space-y-4 md:flex md:space-y-0">
              {/* First Name */}
              <div>
                <div className="flex border-b-2 border-blue-300 hover:border-blue-400">
                  <UserCircleIcon className="h-auto w-8 fill-blue-400" />
                  <input
                    name="fname"
                    id="fname"
                    value={firstName}
                    className="text-md border-none bg-transparent p-1 font-semibold text-neutral-500 outline-none ring-0 focus:ring-0"
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
                    className="text-md border-none bg-transparent p-1 font-semibold text-neutral-500 outline-none ring-0 focus:ring-0"
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
                  className="text-md border-none bg-transparent p-1 font-semibold text-neutral-500 outline-none ring-0 focus:ring-0"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <label htmlFor="email" className="text-xs text-neutral-400">
                Email Address
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
                  <time className="text-md mt-0.5 select-none border-none bg-transparent p-1 font-semibold text-neutral-500 outline-none ring-0 focus:ring-0">
                    {userDetails.createdAt}
                  </time>
                </div>
                <label htmlFor="birthdate" className="text-xs text-neutral-400">
                  Hired Date
                </label>
              </div>
            </div>
            {/* Buttons */}
            {!isDefaultFields && (
              <div className="flex gap-4">
                <motion.button
                  type="button"
                  className="col-span-2 rounded-md bg-neutral-400 p-1 px-8 py-2 font-bold text-white"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={cancelUpdateDetails}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="button"
                  className="col-span-2 rounded-md bg-blue-400 px-16 py-2 font-bold text-white"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Update Details
                </motion.button>
              </div>
            )}
          </div>
        </form>
        <div></div>
      </div>
    </section>
  )
}
