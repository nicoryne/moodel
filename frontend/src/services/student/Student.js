async function studentLogin(formData) {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")

  const res = await fetch("http://localhost:8080/api/student/login", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: headers,
  })

  if (!res.ok) {
    throw new Error("🔴 Login Failed: Invalid credentials")
  }

  const token = await res.text()
  return token
}

async function studentRegister(formData) {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")

  const res = await fetch("http://localhost:8080/api/student/register", {
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

async function studentCreate(formData) {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")

  const res = await fetch("http://localhost:8080/api/student/create", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: headers,
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Failed to create student. Status: ${res.status}`)
  }

  const data = await res.json()
  return data
}

async function studentGetByEmail(email, token) {
  const res = await fetch(`http://localhost:8080/api/student/getByEmail?email=${email}`, {
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

  if (!data || Object.keys(data).length === 0) {
    throw new Error(`🔴 ERROR: No data found for email ${email}`)
  }

  return data
}

async function studentGetAll(token) {
  const res = await fetch("http://localhost:8080/api/student/getAll", {
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

async function updateStudent(formData, token) {
  const res = await fetch("http://localhost:8080/api/student/update", {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Failed to update student. Status: ${res.status}`)
  }

  const data = await res.json()
  return data
}

async function studentDeleteById(id, token) {
  const res = await fetch(`http://localhost:8080/api/student/delete?id=${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Failed to delete student with ID ${id}. Status: ${res.status}`)
  }

  const data = await res.text()
  return data
}

async function studentTestConnection() {
  const res = await fetch("http://localhost:8080/api/student/test")

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Connection test failed. Status: ${res.status}`)
  }

  const data = await res.text()
  return data
}

export { studentLogin, studentRegister, studentCreate, studentGetByEmail, studentGetAll, updateStudent, studentDeleteById, studentTestConnection }
