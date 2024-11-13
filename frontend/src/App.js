import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/home"
import Layout from "./pages/layout"
import StudentDashboard from "./pages/student/student-dashboard"
import TeacherLayout from "./pages/teacher/teacher-layout"
import TeacherCourses from "./pages/teacher/teacher-courses"
import LoginPage from "./pages/login"
import { AuthProvider } from "./middleware/AuthProvider"
import PrivateRoutes from "./middleware/ProtectedRoutes"
import SignUpPage from "./pages/signup"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Navbar Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
          </Route>

          {/* Non-navbar Routes */}
          <Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Route>

          {/* Private Routes */}
          <Route element={<PrivateRoutes />}>
            {/* Student Routes */}
            <Route path="/student" element = {<StudentDashboard />}>
              <Route path="/student/home" element={<StudentDashboard />} />
            </Route>

            {/* Teacher Routes */}
            <Route path="/teacher" element={<TeacherLayout />}>
              <Route path="/teacher/courses" element={<TeacherCourses />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
