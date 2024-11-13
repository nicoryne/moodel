import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/home"
import Layout from "./pages/layout"
import StudentDashboard from "./pages/student/student-dashboard"
import StudentProfile from "./pages/student/student-profile"
import TeacherLayout from "./pages/teacher/teacher-layout"
import TeacherProfile from "./pages/teacher/teacher-profile"
import AdminLayout from "./pages/admin/admin-layout"
import AdminTeachers from "./pages/admin/admin-teachers"
import AdminStudents from "./pages/admin/admin-students"
import TeacherCourses from "./pages/teacher/teacher-courses"
import LoginPage from "./pages/login"
import { AuthProvider } from "./middleware/AuthProvider"
import PrivateRoutes from "./middleware/ProtectedRoutes"
import SignUpPage from "./pages/signup"
import StudentProfilePage from "./pages/student/student-profile"
import AdminLoginPage from "./pages/admin-login"
import AdminCourses from "./pages/admin/admin-courses"

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
            <Route path="/admin-login" element={<AdminLoginPage />} />
          </Route>

          {/* Private Routes */}
          <Route element={<PrivateRoutes />}>
            {/* Student Routes */}
            <Route path="/student" element={<StudentDashboard />}>
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/profile" element={<StudentProfilePage />} />
            </Route>

            {/* Teacher Routes */}
            <Route path="/teacher" element={<TeacherLayout />}>
              <Route path="/teacher/courses" element={<TeacherCourses />} />
              <Route path="/teacher/profile" element={<TeacherProfile />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="/admin/teachers" element={<AdminTeachers />} />
              <Route path="/admin/students" element={<AdminStudents />} />
              <Route path="/admin/courses" element={<AdminCourses />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
