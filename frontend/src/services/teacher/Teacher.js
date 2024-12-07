import { retrieveFile, uploadFile } from "../file"

async function teacherLogin(formData) {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")

  const res = await fetch("http://localhost:8080/api/teacher/login", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: headers,
  })

  if (!res.ok) {
    throw new Error(`🔴 Login Failed: Invalid credentials`)
  }

  const token = await res.text()
  return token
}

async function teacherRegister(formData) {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")

  const res = await fetch("http://localhost:8080/api/teacher/register", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: headers,
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Failed to register. Status: ${res.status}`)
  }

  const data = await res.text()
  return data
}

async function teacherCreate(formData) {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")

  const res = await fetch("http://localhost:8080/api/teacher/create", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: headers,
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Failed to create teacher. Status: ${res.status}`)
  }

  const data = await res.json()
  return data
}

async function teacherGetByEmail(email, token) {
  let res = await fetch(`http://localhost:8080/api/teacher/getByEmail?email=${email}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Request failed with status ${res.status}`)
  }

  let data = await res.json()

  if (!data || Object.keys(data).length === 0) {
    throw new Error(`🔴 ERROR: No data found for email ${email}`)
  }

  if (data.profilePicture) {
    data.profilePicture = await retrieveFile(data.profilePicture, token)
  }

  return data
}

async function teacherGetAll(token) {
  const res = await fetch("http://localhost:8080/api/teacher/getAll", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Request failed with status ${res.status}`)
  }

  const data = await res.json()
  return data
}

async function updateTeacher(formData, token) {
  if (formData.profilePicture) {
    const file = formData.profilePicture
    const fileUuid = await uploadFile(file, token)
    formData.profilePicture = fileUuid
  }
  const res = await fetch("http://localhost:8080/api/teacher/update", {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Failed to update teacher. Status: ${res.status}`)
  }

  const data = await res.json()
  return data
}

async function teacherDeleteById(id, token) {
  const res = await fetch(`http://localhost:8080/api/teacher/delete?id=${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Failed to delete teacher with ID ${id}. Status: ${res.status}`)
  }

  const data = await res.text()
  return data
}

async function teacherTestConnection() {
  const res = await fetch("http://localhost:8080/api/teacher/test", {
    method: "GET",
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Connection test failed. Status: ${res.status}`)
  }

  const data = await res.text()
  return data
}

export {
  teacherLogin,
  teacherRegister,
  teacherCreate,
  teacherGetByEmail,
  teacherGetAll,
  updateTeacher,
  teacherDeleteById,
  teacherTestConnection,
}
