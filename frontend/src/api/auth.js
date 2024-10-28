import { teacherGetByEmail } from "./services/Teacher";
import { redirect } from "react-router-dom";

async function login(email, password) {
  let data = await teacherGetByEmail(email);

  if (!data) {
    throw new Error("🔴 ERROR: Invalid username.");
  }

  console.log(data);
  console.log("Password: " + password);
  console.log("Data Password: " + data.password);

  if (password != data.password) {
    throw new Error("🔴 ERROR: Invalid password.");
  }

  return data;
}

export { login };
