async function uploadFile(file, token) {
  const fileUuid = crypto.randomUUID()

  const fileExtension = file.name.split(".").pop()
  const fileNameWithExtension = `${fileUuid}.${fileExtension}`

  const formDataWithFile = new FormData()
  formDataWithFile.append("file", file, fileNameWithExtension)

  const res = await fetch("http://localhost:8080/api/files/upload", {
    method: "POST",
    body: formDataWithFile,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Failed to upload file. Status: ${res.status}`)
  }

  return fileUuid
}

async function retrieveFile(fileUuid, token) {
  const res = await fetch(`http://localhost:8080/api/files/download/${fileUuid}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Failed to download file. Status: ${res.status}`)
  }

  const blob = await res.blob()

  const fileUrl = URL.createObjectURL(blob)

  return fileUrl
}

async function deleteFile(fileUuid, token) {
  const res = await fetch(`http://localhost:8080/api/files/delete/${fileUuid}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error(`🔴 ERROR: Failed to delete file. Status: ${res.status}`)
  }

  console.log("File deleted successfully:", fileUuid)
}

export { deleteFile, uploadFile, retrieveFile }
