import * as AuthServices from "./index"
import { getAge } from "../lib/utils/getAge"

async function login(email, password, roleType) {
  let loginToken = null

  switch (roleType) {
    case "teacher":
      const teacherPrefix = ".nC1G`89;y."
      let teacherUsername = teacherPrefix.concat(email)

      let teacherFormData = {
        username: teacherUsername,
        password: password,
      }

      loginToken = await AuthServices.teacherLogin(teacherFormData)
      break

    case "student":
      const studentPrefix = ".uQY0b28$m."
      let studentUsername = studentPrefix.concat(email)

      let studentFormData = {
        username: studentUsername,
        password: password,
      }

      loginToken = await AuthServices.studentLogin(studentFormData)
      break

    case "admin":
      const adminPrefix = ".W4bPM0:2Hk."
      let adminUsername = adminPrefix.concat(email)

      let adminFormData = {
        username: adminUsername,
        password: password,
      }

      loginToken = await AuthServices.adminLogin(adminFormData)
      break
    default:
      throw new Error("🔴 ERROR: Invalid role type.")
  }

  if (!loginToken) {
    throw new Error("🔴 ERROR: Failed to login.")
  }

  return loginToken
}

async function signup(email, password, roleType, fname, lname, birthdate) {
  let data = null

  switch (roleType) {
    case "teacher":
      let teacherFormData = {
        lname: lname,
        fname: fname,
        birthDate: birthdate,
        age: getAge(birthdate),
        password: password,
        email: email,
        address: "",
        phoneNumber: "",
        createdAt: new Date().toLocaleDateString("en-CA"),
      }

      data = await AuthServices.teacherRegister(teacherFormData)
      break

    case "student":
      let studentFormData = {
        lname: lname,
        fname: fname,
        birthDate: birthdate,
        age: getAge(birthdate),
        password: password,
        email: email,
        address: "",
        phoneNumber: "",
        createdAt: new Date().toLocaleDateString("en-CA"),
      }

      data = await AuthServices.studentRegister(studentFormData)
      break

    default:
      throw new Error("🔴 ERROR: Invalid role type.")
  }

  if (!data) {
    throw new Error("🔴 ERROR: Failed to register.")
  }

  return data
}

export { login, signup }
