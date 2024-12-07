import React from "react"
import CryptoJS from "crypto-js"
import * as AuthServices from "../services/index"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user", "token", "username", "role"])
  const [isAuthenticated, setAuthenticated] = React.useState(false)
  const navigate = useNavigate()

  const options = {
    path: "/",
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  }

  const saveCookie = (key, value) => {
    setCookie(key, value, { path: "/", ...options })
  }

  const deleteCookie = (key) => {
    removeCookie(key, { path: "/" })
  }

  // environment variables who?
  const encryptionKey = "a2f4e58f98b53cd61a34f87d62bb8931a38e5e3f99d42b60e5b943c8a7cf0f53"

  const encrypt = (value) => {
    return CryptoJS.AES.encrypt(value, encryptionKey).toString()
  }

  const decrypt = (value) => {
    const bytes = CryptoJS.AES.decrypt(value, encryptionKey)
    return bytes.toString(CryptoJS.enc.Utf8)
  }

  const removeAuth = () => {
    deleteCookie("user")
    deleteCookie("role")
    deleteCookie("username")
    deleteCookie("token")
    setAuthenticated(false)
  }

  const reloadUser = () => {
    saveUserDetails()
  }

  const setAuth = async (userToken, username, role) => {
    try {
      saveCookie("token", userToken)
      saveCookie("username", encrypt(username))
      saveCookie("role", encrypt(role))
      setAuthenticated(true)
    } catch (error) {
      console.error("🔴 ERROR setting authentication:", error)
      removeAuth()
    }
  }

  const saveUserDetails = async () => {
    if (!cookies.token || !cookies.username || !cookies.role) {
      return
    }

    let user = null
    let data = null
    const decryptedUsername = decrypt(cookies.username)
    const decryptedRole = decrypt(cookies.role)

    switch (decryptedRole) {
      case "teacher":
        user = await AuthServices.teacherGetByEmail(decryptedUsername, cookies.token)

        if (user) {
          data = {
            teacherId: user.teacherId,
            fname: user.fname,
            lname: user.lname,
            birthdate: new Date(user.birthDate).toLocaleDateString("en-CA"),
            age: user.age,
            email: user.email,
            phoneNumber: user.phoneNumber,
            address: user.address,
            createdAt: new Date(user.createdAt).toLocaleDateString("en-CA"),
            courses: user.ownedCourses,
            profilePicture: user.profilePicture,
            role: decryptedRole,
          }
        }

        break
      case "student":
        user = await AuthServices.studentGetByEmail(decryptedUsername, cookies.token)

        if (user) {
          data = {
            studentId: user.studentId,
            fname: user.fname,
            lname: user.lname,
            birthdate: new Date(user.birthDate).toLocaleDateString("en-CA"),
            age: user.age,
            email: user.email,
            phoneNumber: user.phoneNumber,
            address: user.address,
            createdAt: new Date(user.createdAt).toLocaleDateString("en-CA"),
            courses: user.courseEnrollments,
            profilePicture: user.profilePicture,
            role: decryptedRole,
          }
        }

        break
      case "admin":
        user = await AuthServices.adminGetByEmail(decryptedUsername, cookies.token)
        break
      default:
        throw new Error("🔴 ERROR: Invalid role type.")
    }

    if (data) {
      saveCookie("user", JSON.stringify(data))
    }
  }

  React.useEffect(() => {
    if (!isAuthenticated) {
      removeAuth()
    } else {
      saveUserDetails()

      let role = decrypt(cookies.role)
      navigate(`/${role}`)
    }
  }, [isAuthenticated])

  // Logger
  React.useEffect(() => {
    if (cookies.token) {
      console.log("✅ TOKEN")
    } else {
      console.log("🔴 NO TOKEN")
    }

    if (cookies.username) {
      console.log("✅ USERNAME")
    } else {
      console.log("🔴 NO USERNAME")
    }

    if (cookies.role) {
      console.log("✅ ROLE")
    } else {
      console.log("🔴 NO ROLE")
    }

    if (cookies.user) {
      console.log("✅ USER")
    } else {
      console.log("🔴 NO USER")
    }

    if (isAuthenticated) {
      console.log("✅ AUTHENTICATED")
    } else {
      console.log("🔴 NOT AUTHENTICATED")
    }
  }, [cookies, isAuthenticated])

  return (
    <AuthContext.Provider value={{ isAuthenticated, cookies, removeAuth, setAuth, reloadUser }}>
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
