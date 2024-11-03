import { teacherGetByEmail } from "./Teacher";
import { redirect } from "react-router-dom";

async function login(email, password, roleType) {
  let data = null;

  switch (roleType) {
    case "teacher":
      data = await teacherGetByEmail(email);
      break;
    case "student":
      // TODO: implement student
      break;
    default:
      break;
  }

  if (!data) {
    throw new Error("🔴 ERROR: Invalid username.");
  }

  if (password !== data.password) {
    throw new Error("🔴 ERROR: Invalid password.");
  }

  localStorage.setItem("user", JSON.stringify(data));
  console.log(data);
  return data;
}

export { login };
