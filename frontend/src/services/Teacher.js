async function teacherGenerateToken(formData) {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")

  console.log(formData)

  const res = await fetch(`http://localhost:3000/api/teacher/generateToken`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: headers,
  })

  if (!res.ok) {
    throw new Error(
      `🔴 ERROR: Failed to generate teacher token. Status: ${res.status}`,
    )
  }

  const data = await res.json()
  return data.token
}

async function teacherGetByEmail(email) {
  let res = await fetch(
    `http://localhost:3000/api/teacher/getTeacherByEmail?email=${email}`,
  )

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Request failed with status ${res.status}`)
  }

  let data = await res.json()

  if (!data || Object.keys(data).length === 0) {
    throw new Error(`🔴 ERROR: No data found for email ${email}`)
  }

  return data
}

async function teacherDeleteById(id) {
  const res = await fetch(
    `http://localhost:3000/api/teacher/deleteTeacherDetails/${id}`,
    {
      method: "DELETE",
    },
  )

  if (!res.ok) {
    throw new Error(
      `🔴 ERROR: Failed to delete teacher with ID ${id}. Status: ${res.status}`,
    )
  }

  const data = await res.text()
  return data
}

async function teacherPostRecord(formData) {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")

  const res = await fetch(
    `http://localhost:3000/api/teacher/postTeacherRecord`,
    {
      method: "POST",
      body: JSON.stringify(formData),
      headers: headers,
    },
  )

  if (!res.ok) {
    throw new Error(
      `🔴 ERROR: Failed to create teacher record. Status: ${res.status}`,
    )
  }

  const data = await res.text()
  return data
}

async function teacherTestConnection() {
  const res = await fetch("http://localhost:3000/api/teacher/testConnection")

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Connection test failed. Status: ${res.status}`)
  }

  const data = await res.text()
  return data
}

export {
  teacherGenerateToken,
  teacherGetByEmail,
  teacherDeleteById,
  teacherPostRecord,
  teacherTestConnection,
}
