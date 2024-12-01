import React from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  EnvelopeIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  CakeIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid"
import { motion } from "framer-motion"
import { signup } from "../services/auth"
import { MotionComponent } from "./MotionComponent"

export default function SignUpForm() {
  const navigate = useNavigate()

  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [birthDate, setBirthDate] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [role, setRole] = React.useState("")

  const [passwordHidden, togglePasswordHidden] = React.useState(false)
  const [confirmPasswordHidden, toggleConfirmPasswordHidden] = React.useState(false)

  const [errorEmail, setErrorEmail] = React.useState("")
  const [errorPassword, setErrorPassword] = React.useState("")
  const [errorConfirmPassword, setErrorConfirmPassword] = React.useState("")

  // Email Validation
  React.useEffect(() => {
    // Checks if string has characters followed by '@', and then a '.'
    // with atleast 2 extra characters
    const regexEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    // Tests if email length is greater than 3, and against the regex pattern
    // if it matches
    if (email.length > 5 && !regexEmailPattern.test(email)) {
      setErrorEmail("Error: Please enter a valid email.")
    } else {
      setErrorEmail("")
    }
  }, [email, setErrorEmail])

  // Password Validation
  React.useEffect(() => {
    if (password.length > 0 && password.length < 8) {
      setErrorPassword("Error: Password must contain at least 8 characters!")
    } else {
      setErrorPassword("")
    }
  }, [password, setErrorPassword])

  // Confirm Password Validation
  React.useEffect(() => {
    if (confirmPassword.length > 0 && password.length > 0 && confirmPassword !== password) {
      setErrorConfirmPassword("Error: passwords don't match!")
    } else {
      setErrorConfirmPassword("")
    }
  }, [confirmPassword, password, setErrorConfirmPassword])

  // Signup function
  const handleSignUp = async () => {
    if (!email || !password || !role) {
      setErrorConfirmPassword("All fields are required.")
      return
    }

    try {
      let data = await signup(email, password, role, firstName, lastName, birthDate)
      if (data) {
        navigate(`/${role}`)
      }
    } catch (error) {
      setErrorConfirmPassword(error.message || "Login failed. Please try again.")
    }
  }

  return (
    <section className="mx-auto h-fit rounded-md border-2 border-blue-400 bg-white p-8 text-[#212121] shadow-md">
      {/* Title and Close Button Container */}
      <div className="flex justify-between">
        <h1 className="w-fit text-2xl font-bold text-blue-400">Sign Up Form</h1>
        <Link to="/">
          <MotionComponent
            as={XMarkIcon}
            className="h-auto w-8 text-neutral-300 outline-none hover:text-red-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />
        </Link>
      </div>
      {/* Form Group */}
      <form className="mb-4 mt-8 grid gap-2 space-y-4 md:grid-cols-2">
        {/* First Name Group */}
        <div className="col-span-2 flex flex-col justify-end space-y-2 md:col-span-1">
          <div className="flex border-b-2 border-blue-300 hover:border-blue-400">
            <input
              name="fname"
              id="fname"
              placeholder="Enter your first name"
              className="text-md flex-1 border-none bg-transparent p-1 text-neutral-600 outline-none ring-0 focus:ring-0"
              type="name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
        </div>

        {/* Last Name Group */}
        <div className="col-span-2 flex flex-col justify-end space-y-2 md:col-span-1">
          <div className="flex border-b-2 border-blue-300 hover:border-blue-400">
            <input
              name="lname"
              id="lname"
              placeholder="Enter your last name"
              className="text-md flex-1 border-none bg-transparent p-1 text-neutral-600 outline-none ring-0 focus:ring-0 md:indent-1"
              type="name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        {/* Birth Date Group */}
        <div className="col-span-2 flex flex-col justify-end space-y-2">
          <div className="flex w-full border-b-2 border-blue-300 hover:border-blue-400">
            <CakeIcon className="h-auto w-8 rounded-l-sm border-blue-300 px-1 text-blue-400" />
            <input
              name="birthdate"
              id="birthdate"
              placeholder="Enter your birthdate"
              className="text-md flex-1 border-none bg-transparent p-1 indent-1 text-neutral-600 outline-none ring-0 focus:ring-0"
              type="date"
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
        </div>

        {/* Email Input Group */}
        <div className="col-span-2 flex flex-col justify-end space-y-2">
          <div className="flex w-full border-b-2 border-blue-300 hover:border-blue-400">
            <EnvelopeIcon className="h-auto w-8 rounded-l-sm border-blue-300 px-1 text-blue-400" />
            <input
              name="email"
              id="email"
              placeholder="Enter your email"
              className="text-md flex-1 border-none bg-transparent p-1 indent-1 text-neutral-600 outline-none ring-0 focus:ring-0"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {errorEmail && <p className="text-xs font-semibold text-red-400">{errorEmail}</p>}
        </div>

        {/* Password Input Group */}
        <div className="col-span-2 flex flex-col justify-end space-y-2">
          <div className="flex w-full border-b-2 border-blue-300 hover:border-blue-400">
            <LockClosedIcon className="h-auto w-8 rounded-l-sm border-blue-300 px-1 text-blue-400" />
            <input
              name="password"
              id="password"
              placeholder="Enter your password"
              className="text-md flex-1 border-none p-1 indent-1 text-neutral-600 outline-none ring-0 focus:ring-0"
              type={passwordHidden ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!passwordHidden ? (
              <MotionComponent
                as={EyeIcon}
                className="h-auto w-8 cursor-pointer px-1 text-blue-400 outline-none active:ring-0"
                onClick={() => togglePasswordHidden(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            ) : (
              <MotionComponent
                as={EyeSlashIcon}
                className="h-auto w-8 cursor-pointer px-1 text-blue-200 outline-none active:ring-0"
                onClick={() => togglePasswordHidden(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            )}
          </div>
          {errorPassword && <p className="text-xs font-semibold text-red-400">{errorPassword}</p>}
        </div>

        {/* Confirm Password Input Group */}
        <div className="col-span-2 flex flex-col justify-end space-y-2">
          <div className="flex w-full border-b-2 border-blue-300 hover:border-blue-400">
            <LockClosedIcon className="h-auto w-8 rounded-l-sm border-blue-300 px-1 text-blue-400" />
            <input
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm your password"
              className="text-md flex-1 border-none p-1 indent-1 text-neutral-600 outline-none ring-0 focus:ring-0"
              type={confirmPasswordHidden ? "text" : "password"}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {!confirmPasswordHidden ? (
              <MotionComponent
                as={EyeIcon}
                className="h-auto w-8 cursor-pointer px-1 text-blue-400 outline-none active:ring-0"
                onClick={() => toggleConfirmPasswordHidden(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            ) : (
              <MotionComponent
                as={EyeSlashIcon}
                className="h-auto w-8 cursor-pointer px-1 text-blue-200 outline-none active:ring-0"
                onClick={() => toggleConfirmPasswordHidden(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            )}
          </div>
          {errorConfirmPassword && <p className="text-xs font-semibold text-red-400">{errorConfirmPassword}</p>}
        </div>

        <div className="space-y-2">
          <p className="text-sm font-bold text-blue-400">I'm signing up as a</p>
          <div className="col-span-2 flex space-x-4">
            <label className="flex space-x-2">
              <input
                type="radio"
                label="teacher"
                name="role"
                value="teacher"
                id="role-teacher"
                checked={role === "teacher"}
                onChange={(e) => setRole(e.target.value)}
              />
              <BriefcaseIcon className="h-auto w-4 text-blue-500" />
              <span className="font-semibold text-blue-400">Teacher</span>
            </label>

            <label className="flex space-x-2">
              <input
                type="radio"
                label="student"
                name="role"
                value="student"
                id="role-student"
                checked={role === "student"}
                onChange={(e) => setRole(e.target.value)}
              />
              <AcademicCapIcon className="h-auto w-4 text-blue-500" />
              <span className="font-semibold text-blue-400">Student</span>
            </label>
          </div>
        </div>

        {/* Login Submit Button */}
        <motion.button
          type="button"
          className="col-span-2 w-full rounded-md bg-blue-400 p-1 font-bold text-white"
          onClick={handleSignUp}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign Up
        </motion.button>
      </form>
      <div className="flex justify-between">
        <p className="text-xs text-neutral-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:text-blue-500 hover:drop-shadow-md active:text-blue-200">
            Login now.
          </Link>
        </p>
      </div>
    </section>
  )
}
