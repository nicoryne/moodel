import React from "react"
import * as AuthServices from "../services/index"

const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = React.useState(null)
  const [user, setUser] = React.useState(null)

  const setAuth = async (userToken, username, role) => {
    setToken(userToken)

    switch (role) {
      case "teacher":
        let teacher = await AuthServices.teacherGetByEmail(username, userToken)
        setUser(teacher)
        break
      case "student":
        let student = await AuthServices.studentGetByEmail(username, userToken)
        setUser(student)
        break
      case "admin":
        let admin = await AuthServices.adminGetByEmail(username, userToken)
        setUser(admin)
        break
      default:
        throw new Error("🔴 ERROR: Invalid role type.")
    }
  }

  const removeAuth = () => {
    setToken(null)
    setUser(null)
  }

  const isAuthenticated = !!token

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuth, removeAuth, user, token }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)

  if (!context) {
    throw new Error("🔴 ERROR: useAuth must be used within an AuthProvider.")
  }

  return context
}
