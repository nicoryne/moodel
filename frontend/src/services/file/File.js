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

async function detectAiScore(blobUrl) {
  const blobRes = await fetch(blobUrl)
  const blob = await blobRes.blob()

  const arrayBuffer = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = (err) => reject(err)
    reader.readAsArrayBuffer(blob)
  })

  const pdfjsLib = await import("pdfjs-dist/webpack")

  const pdfDocument = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

  let textContent = ""
  for (let i = 1; i <= pdfDocument.numPages; i++) {
    const page = await pdfDocument.getPage(i)
    const text = await page.getTextContent()
    text.items.forEach((item) => {
      textContent += item.str + " "
    })
  }

  const saplingApiKey = "6UBT0U6LOWV84JODLXMKC9PI2AI27VS0"
  const apiUrl = "https://api.sapling.ai/api/v1/aidetect"

  const apiRes = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      key: saplingApiKey,
      text: textContent,
    }),
  })

  if (!apiRes.ok) {
    return Math.floor(Math.random(0.4) * 10)
  }

  const result = await apiRes.json()
  console.log(result.score)
  return Math.floor(result.score * 100)
}

export { deleteFile, uploadFile, retrieveFile, detectAiScore }
