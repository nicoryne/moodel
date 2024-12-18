import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { EyeIcon, EyeSlashIcon, LockClosedIcon, EnvelopeIcon, XMarkIcon } from "@heroicons/react/20/solid"
import { motion } from "framer-motion"
import { login } from "../../services/auth"
import { MotionComponent } from "../MotionComponent"
import { useAuth } from "../../middleware/AuthProvider"

export default function AdminLoginForm() {
  const { setAuth } = useAuth()
  const [passwordHidden, togglePasswordHidden] = React.useState(false)
  const [email, setEmail] = React.useState(null)
  const [password, setPassword] = React.useState(null)
  const [error, setError] = React.useState("")

  const handleLogin = async () => {
    if (!email || !password) {
      setError("All fields are required.")
      return
    }

    try {
      let loginToken = await login(email, password, "admin")
      if (loginToken) {
        setAuth(loginToken, email, "admin")
      }
    } catch (error) {
      setError(error.message || "Login failed. Please try again.")
    }
  }

  return (
    <section className="mx-auto h-fit rounded-md border-2 border-blue-400 bg-white p-8 text-[#212121] shadow-md md:w-96">
      <div className="flex justify-between">
        <h1 className="w-fit text-2xl font-bold text-blue-400">Admin Login</h1>
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
      <form className="mb-4 mt-8 space-y-4">
        {/* Email Input Group */}
        <div className="flex flex-col space-y-2">
          <div className="flex w-full border-b-2 border-blue-300 hover:border-blue-400">
            <EnvelopeIcon className="h-auto w-8 rounded-l-sm border-blue-300 px-1 text-blue-400" />
            <input
              name="email"
              id="email"
              placeholder="Enter your email"
              className="text-md flex-1 border-none bg-transparent p-1 indent-1 text-neutral-600 outline-none"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password Input Group */}
        <div className="flex flex-col space-y-2">
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
          <p className="text-xs font-semibold text-red-400">{error}</p>
        </div>

        {/* Login Submit Button */}
        <motion.button
          type="button"
          className="w-full rounded-md bg-blue-400 p-1 font-bold text-white"
          onClick={handleLogin}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>
      </form>
    </section>
  )
}
