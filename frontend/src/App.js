import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/home"
import Layout from "./pages/layout"
import StudentDashboard from "./pages/student/student-dashboard"
import TeacherDashboard from "./pages/teacher/teacher-dashboard"
import LoginPage from "./pages/login"
import { AuthProvider } from "./middleware/AuthProvider"
import PrivateRoutes from "./middleware/ProtectedRoutes"
import SignUpPage from "./pages/signup"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* General Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Private Routes */}
          <Route element={<PrivateRoutes />}>
            {/* Student Routes */}
            <Route path="/student">
              <Route path="/student/home" element={<StudentDashboard />} />
            </Route>

            {/* Teacher Routes */}
            <Route path="/teacher">
              <Route path="/teacher/home" element={<TeacherDashboard />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
