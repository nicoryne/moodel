export default function Unauthorized() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-red-500">Access Denied</h1>
      <p className="mt-4 text-gray-600">You do not have permission to view this page.</p>
    </div>
  )
}
