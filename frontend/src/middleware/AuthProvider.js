import React, { createContext, useContext } from "react"
import * as AuthServices from "../services/index"
import { useCookies } from "react-cookie"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user", "token", "role"])

  const setAuth = async (userToken, username, role) => {
    const options = {
      path: "/",
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    }

    try {
      setCookie("token", userToken, options)
      setCookie("role", role, options)
      let user

      switch (role) {
        case "teacher":
          user = await AuthServices.teacherGetByEmail(username, userToken)
          break
        case "student":
          user = await AuthServices.studentGetByEmail(username, userToken)
          break
        case "admin":
          user = await AuthServices.adminGetByEmail(username, userToken)
          break
        default:
          throw new Error("🔴 ERROR: Invalid role type.")
      }

      setCookie("user", JSON.stringify(user), options)
    } catch (error) {
      console.error("🔴 ERROR setting authentication:", error)
      removeCookie("token", { path: "/" })
    }
  }

  const removeAuth = () => {
    const options = { path: "/" }
    removeCookie("user", options)
    removeCookie("token", options)
    removeCookie("role", options)
  }

  const updateUser = (user) => {
    const options = {
      path: "/",
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    }

    setCookie("user", JSON.stringify(user), options)
  }

  const isAuthenticated = !!cookies.token

  return (
    <AuthContext.Provider value={{ isAuthenticated, cookies, removeAuth, setAuth, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("🔴 ERROR: useAuth must be used within an AuthProvider.")
  }

  return context
}
