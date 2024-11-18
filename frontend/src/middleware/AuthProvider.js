import React from "react"
import * as AuthServices from "../services/index"
import { useCookies } from 'react-cookie';

const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [cookies, setCookies, removeCookie] = useCookies(['user'], ['token']);

  const setAuth = async (userToken, username, role) => {
    setCookies('token', userToken)

    switch (role) {
      case "teacher":
        let teacher = await AuthServices.teacherGetByEmail(username, userToken)
        setCookies('user', teacher)
        break
      case "student":
        let student = await AuthServices.studentGetByEmail(username, userToken)
        setCookies('user', student)
        break
      case "admin":
        let admin = await AuthServices.adminGetByEmail(username, userToken)
        setCookies('user', admin)
        break
      default:
        throw new Error("🔴 ERROR: Invalid role type.")
    }
  }

  const removeAuth = () => {
    removeCookie('user')
    removeCookie('token')
  }

  const isAuthenticated = !!cookies.token

  return (
    <AuthContext.Provider value={{ isAuthenticated, cookies, removeAuth, setAuth }}>
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
