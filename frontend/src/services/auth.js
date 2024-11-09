import { teacherRegister, teacherLogin } from "./Teacher"
import { getAge } from "../lib/utils/getAge"
import { redirect } from "react-router-dom"

async function login(email, password, roleType) {
  let loginToken = null

  switch (roleType) {
    case "teacher":
      const prefix = ".nC1G`89;y."
      let username = prefix.concat(email)

      let formData = {
        username: username,
        password: password,
      }

      loginToken = await teacherLogin(formData)
      break
    case "student":
      // TODO: implement student
      break
    default:
      throw new Error("🔴 ERROR: Invalid role type.")
  }

  return loginToken
}

async function signup(email, password, roleType, fname, lname, birthdate) {
  let data = null

  switch (roleType) {
    case "teacher":
      let formData = {
        lname: lname,
        fname: fname,
        birthDate: birthdate,
        age: getAge(birthdate),
        password: password,
        email: email,
        address: "",
        phoneNumber: "",
        hireDate: new Date().toLocaleDateString("en-CA"),
      }

      data = await teacherRegister(formData)
      break
    case "student":
      // TODO: implement student
      break
    default:
      throw new Error("🔴 ERROR: Invalid role type.")
  }

  if (!data) {
    throw new Error("🔴 ERROR: Failed to register.")
  }

  if (data) {
    return data
  }
}

export { login, signup }
