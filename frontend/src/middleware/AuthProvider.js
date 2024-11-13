import React from "react"
import { teacherGetByEmail } from "../services/Teacher"

const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = React.useState(null)
  const [user, setUser] = React.useState(null)

  const setAuth = async (userToken, username, role) => {
    setToken(userToken)

    switch (role) {
      case "teacher":
        let teacher = await teacherGetByEmail(username, userToken)
        setUser(teacher)
        break
      case "student":
        break
      default:
        throw new Error("🔴 ERROR: Invalid role type.")
    }
  }

  const removeAuth = () => {
    setToken(null)
    localStorage.removeItem('token')
    setUser(null)
  }

  const isAuthenticated = !!token

  return <AuthContext.Provider value={{ isAuthenticated, setAuth, removeAuth, user }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)

  if (!context) {
    throw new Error("🔴 ERROR: useAuth must be used within an AuthProvider.")
  }

  return context
}
