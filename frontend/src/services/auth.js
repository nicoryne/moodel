import { teacherRegister } from "./Teacher"
import { redirect } from "react-router-dom"

async function login(formData, roleType) {
  let data = null

  switch (roleType) {
    case "teacher":
      // data = await teacherGenerateToken(formData)
      break
    case "student":
      // TODO: implement student
      break
    default:
      break
  }

  if (!data) {
    throw new Error("🔴 ERROR: Invalid username.")
  }

  if (formData.password !== data.password) {
    throw new Error("🔴 ERROR: Invalid password.")
  }

  if (data) {
    localStorage.setItem("user", JSON.stringify(data))
    console.log(data)
    return data
  }
}

async function signup(formData, roleType) {
  let data = null

  switch (roleType) {
    case "teacher":
      data = await teacherRegister(formData)
      break
    case "student":
      // TODO: implement student
      break
    default:
      break
  }

  if (!data) {
    throw new Error("🔴 ERROR: Failed to register.")
  }

  if (data) {
    localStorage.setItem("user", JSON.stringify(data))
    console.log(data)
    return data
  }
}

export { login, signup }
