import { teacherRegister, teacherLogin } from "./Teacher";
import { studentRegister, studentLogin } from "./Student";
import { getAge } from "../lib/utils/getAge";

async function login(email, password, roleType) {
  let loginToken = null;

  switch (roleType) {
    case "teacher":
      const teacherPrefix = ".nC1G`89;y.";
      let teacherUsername = teacherPrefix.concat(email);

      let teacherFormData = {
        username: teacherUsername,
        password: password,
      };

      loginToken = await teacherLogin(teacherFormData);
      break;

    case "student":
      const studentPrefix = ".uQY0b28$m.";
      let studentUsername = studentPrefix.concat(email);

      let studentFormData = {
        username: studentUsername,
        password: password,
      };

      loginToken = await studentLogin(studentFormData);
      break;

    default:
      throw new Error("🔴 ERROR: Invalid role type.");
  }

  return loginToken;
}

async function signup(email, password, roleType, fname, lname, birthdate) {
  let data = null;

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
        hireDate: new Date().toLocaleDateString("en-CA"),
      };

      data = await teacherRegister(teacherFormData);
      break;

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
        enrollmentDate: new Date().toLocaleDateString("en-CA"),
      };

      data = await studentRegister(studentFormData);
      break;

    default:
      throw new Error("🔴 ERROR: Invalid role type.");
  }

  if (!data) {
    throw new Error("🔴 ERROR: Failed to register.");
  }

  return data;
}

export { login, signup };