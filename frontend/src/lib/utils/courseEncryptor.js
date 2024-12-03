export function encryptCourseId(courseId) {
  const encrypted = btoa(courseId.toString())
  return encrypted
}

export function decryptJoinCode(joinCode) {
  const decrypted = atob(joinCode)
  return Number(decrypted)
}
